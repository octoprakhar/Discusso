/**
 * @jest-environment jsdom
 */

import { render, screen, fireEvent, act } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import * as actions from "@/app/_libs/actions";
import { Post } from "@/app/_components/Posts";
import { POST } from "@/app/api/posts/route";

// Mock router
jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    refresh: jest.fn(),
  }),
}));

// Mock server actions
jest.mock("@/app/_libs/actions", () => ({
  togglePostVote: jest.fn(),
  togglePostPreferences: jest.fn(),
}));

// Helper to wrap component with QueryClientProvider
function renderWithQueryClient(ui) {
  const queryClient = new QueryClient();
  return render(
    <QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>
  );
}

describe("Post Component — Upvote/Downvote", () => {
  const basePost = {
    id: "post123",
    title: "My test post",
    createdAt: new Date().toISOString(),

    noOfUpvotes: 10,
    noOfDownvotes: 2,

    hasUserAlreadyUpvoted: false,
    hasUserAlreadyDownvoted: false,
    hasUserSavedPost: false,
  };

  const community = {
    communityId: "c1",
    logo: "/test.png",
    communityName: "d/testing",
  };

  //Testing to check if upvote is clicked it must show existing upvote + 1 in button
  test("upvote increases count optimistically", async () => {
    actions.togglePostVote.mockResolvedValue({
      success: "Upvoted",
      post: {
        ...basePost,
        noOfUpvotes: 11,
        hasUserAlreadyUpvoted: true,
      },
    });

    renderWithQueryClient(<Post post={basePost} community={community} />);

    const upvoteButton = screen.getByText("10");

    await act(async () => {
      fireEvent.click(upvoteButton);
    });

    expect(screen.getByText("11")).toBeInTheDocument();
  });

  //   Testing to check if downvote is clicked it must show existing upvote + 1 in button
  test("downvote increases count optimistically", async () => {
    actions.togglePostVote.mockResolvedValue({
      success: "Downvoted",
      post: { ...basePost, noOfDownvotes: 3, hasUserAlreadyDownvoted: true },
    });
    renderWithQueryClient(<Post post={basePost} community={community} />);
    const downvoteButton = screen.getByText("2");

    await act(async () => {
      fireEvent.click(downvoteButton);
    });

    expect(screen.getByText("3")).toBeInTheDocument();
  });

  test("switches from upvoted to downvoted correctly", async () => {
    const post = {
      ...basePost,
      noOfUpvotes: 10,
      noOfDownvotes: 2,
      hasUserAlreadyUpvoted: true,
      hasUserAlreadyDownvoted: false,
    };

    //Server action returns after switching to downvote
    actions.togglePostVote.mockResolvedValue({
      success: "Downvoted",
      post: {
        ...post,
        noOfUpvotes: 9,
        noOfDownvotes: 3,
        hasUserAlreadyUpvoted: false,
        hasUserAlreadyDownvoted: true,
      },
    });
    renderWithQueryClient(<Post post={post} community={community} />);

    const downvoteButton = screen.getByText("2");
    await act(async () => {
      fireEvent.click(downvoteButton);
    });
    expect(screen.getByText("9")).toBeInTheDocument(); // upvotes decreased
    expect(screen.getByText("3")).toBeInTheDocument(); // downvotes increased
  });

  test("switches from downvoted to upvoted correctly", async () => {
    const post = {
      ...basePost,
      noOfUpvotes: 10,
      noOfDownvotes: 2,
      hasUserAlreadyUpvoted: false,
      hasUserAlreadyDownvoted: true,
    };

    // What server action returns after switching to upvote
    actions.togglePostVote.mockResolvedValue({
      success: "Upvoted",
      post: {
        ...post,
        noOfUpvotes: 11, // increase by 1
        noOfDownvotes: 1, // decrease by 1
        hasUserAlreadyUpvoted: true,
        hasUserAlreadyDownvoted: false,
      },
    });

    renderWithQueryClient(<Post post={post} community={community} />);

    const upvoteButton = screen.getByText("10");

    await act(async () => {
      fireEvent.click(upvoteButton);
    });

    expect(screen.getByText("11")).toBeInTheDocument(); // upvotes increased
    expect(screen.getByText("1")).toBeInTheDocument(); // downvotes decreased
  });

  test("neutralizing upvote", async () => {
    const post = {
      ...basePost,
      noOfUpvotes: 10,
      noOfDownvotes: 2,
      hasUserAlreadyUpvoted: true,
      hasUserAlreadyDownvoted: false,
    };
    actions.togglePostVote.mockResolvedValue({
      success: "Upvoted",
      post: {
        ...post,
        noOfUpvotes: 9,
        hasUserAlreadyUpvoted: false,
      },
    });

    renderWithQueryClient(<Post post={basePost} community={community} />);

    const upvoteButton = screen.getByText("10");

    await act(async () => {
      fireEvent.click(upvoteButton);
    });

    expect(screen.getByText("9")).toBeInTheDocument();
  });

  test("neutralizing downvote", async () => {
    const post = {
      ...basePost,
      noOfUpvotes: 10,
      noOfDownvotes: 2,
      hasUserAlreadyUpvoted: false,
      hasUserAlreadyDownvoted: true,
    };
    actions.togglePostVote.mockResolvedValue({
      success: "Upvoted",
      post: {
        ...post,
        noOfDownvotes: 1,
        hasUserAlreadyDownvoted: false,
      },
    });

    renderWithQueryClient(<Post post={basePost} community={community} />);

    const upvoteButton = screen.getByText("2");

    await act(async () => {
      fireEvent.click(upvoteButton);
    });

    expect(screen.getByText("1")).toBeInTheDocument();
  });

  //SAVE POST FEATURE
  test("saves post when save button is clicked", async () => {
    const post = {
      ...basePost,
      hasUserSavedPost: false,
    };

    actions.togglePostPreferences.mockResolvedValue({
      success: "Saved",
      post: {
        ...post,
        hasUserSavedPost: true,
      },
    });

    renderWithQueryClient(
      <Post post={post} community={community} toShowBookMarkButton={true} />
    );

    const saveButton = screen.getByTestId("save-button");

    await act(async () => {
      fireEvent.click(saveButton);
    });

    // Button should now be the unsave button
    expect(screen.getByTestId("unsave-button")).toBeInTheDocument();
  });

  //UNSAVE POST FEATURE
  test("saves post when save button is clicked", async () => {
    const post = {
      ...basePost,
      hasUserSavedPost: true,
    };

    actions.togglePostPreferences.mockResolvedValue({
      success: "Unsaved",
      post: {
        ...post,
        hasUserSavedPost: false,
      },
    });

    renderWithQueryClient(
      <Post post={post} community={community} toShowBookMarkButton={true} />
    );

    const saveButton = screen.getByTestId("unsave-button");

    await act(async () => {
      fireEvent.click(saveButton);
    });

    // Button should now be the unsave button
    expect(screen.getByTestId("save-button")).toBeInTheDocument();
  });
});
