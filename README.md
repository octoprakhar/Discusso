# Discusso : Where conversations find a home.

## Project Requirements

**Discusso** is a social community platfor inspired by Reddit. It enables users to share posts, join discussions, and explore communities. The platform also integrates ML/DL features(in later phases) for personalized recommendations, semantic search, and content moderation.

## Core Features

### Authentication & User Management

    1. User Registration & Login
        - New users register with email + password
        - Login with valid credentials
        - Sessions are persisted(user stays logged in unless explicitly signed out)
    2. Session Handling
        - If already logged in, redirect to home(skip login page).
        - Secure session management with JWT cookies.
    3. Profile Management
        - Update profile(username, avatar).
        - Manage drafts (saved posts).
        - Change email & password.
        - View karma (upvotes - downvotes).

### Communities

    1. Create Communities
        - Users with >= **50 karma** and joined >= **50 days ago** can create a community.
        - Communities prefixed with "d/"(like d/technology).
    2. Explore Communities
        - An Explore tab shows recommended communities (via ML recommendations).
        - Users can search communities using (d/<name>).

### Posts & Feeds

    1. Create Posts
        - Fields:
            * Community name (d/community)
            * Title (required)
            * Body (optional, formatted with Markdown-style editor: bold, italic, code, blocks, images)
            * Tags (Mature, Spoiler, Affiliate, None)
            * Attachments: Images/videos
        - Options: **Publish** or **Save as Draft**.
    2. Feed System
        - Home Feed: posts from joined communities.
        - Popular Feed: top upvoted posts site-wide.
        - Explore Feed: recommened posts/communities (ML-powered).
    3. Post Interactions
        - Upvote/Downvote (affects karrma).
        - Share (copy link)
        - Comment + reply.
        - Bookmark/save for later.

### Search

    1. Search by:
        - Community (d/xyz)
        - Post title or description
    2. (Future ML Feature) **Semantic Search** -> FInd posts by meaning, not just keywords.

### Gamification (Karma System)

    1. Karma - Total upvotes - downvotes
    2. Karma unlocks features (like community creation).
    3. Visible in user profile.

## Planned ML/DL Features (Phase 2)

    1. Personalized Feed -> Recommend posts based on user behavior.
    2. Toxicity Detection -> Flag/report offensive comments using NLP.
    3. Auto-Tagging -> NLP to generate suggested tags for new posts.
    4. Semantic Search -> Use embeddings for meaning-based search
    5. Trend Prediction -> Early prediction of which posts will become popular.

## App Flow

    1. Guest User
        - Can Browse public posts.
        - Can search communities/posts.
        - Redirected to login when trying to upvote/comment/create.

    2. Authenticated User
        - Access home feed, communities, and profile.
        - Create posts/draft.
        - Vote, comment, share, and save posts.
        - Eligible to create communities if requirements met.

    3. Admin/Moderator (Future)
        - Manage flagged posts/comments
        - Community moderation (ban usrs, approve posts).

## Tech Stack

    - **Frontend & Backend**: Next.js + TailwindCSS
    - **Database**: Supabase(Postgres)
    - **Authentication**: Custom JWT (via Next.js API routes)
    - **ML/DL Models**: HuggingFace/ PyTorch / Tesorflow (later integration)
    - Deployment: Vercel

## Development Roadmap

### Phase 1 - UI skeleton(1-2 weeks)

    - Build static pages: Home, Popular, Explore, Login/Signup, Profile, Community, Post Detail.

### Phase 2 - Authentication & Profiles (1 week)

    - Custom JWT - based auth
    - User profile & session handling

### Phase 3 - Core Features (2-3 weeks)

    - Posts(CRUD), communities, votes, comments.
    - Karma system.
    - Search.

### Phase 4 - ML/DL Enhancements (2-3 weeks)

    - Recommendation system.
    - Toxicity detection.
    - Semantic search.
    - Trend Prediction

## Routes/Planned pages:

1. "/login" - Login Page
2. "/register" - Register Page
3. "/user/create-post" - Create New Posts
4. "/user/create-community" - Create Community Page
5. "/" = Home page
6. "/explore" = Explore Page
7. "/popular" = Popular Page
8. "communities/[communityID]" = View a Community Page
9. "/posts/[postID]" = View a Post
10. "/user/drafts/[draftID]" => View a particular draft
11. "user/drafts" = View all drafts
12. "/user/posts" = View all user's posts
13. "/user/[userID]" = Profile page to see your profile or others'(bio, posts, karma , etc.)
14. "/settings" = Setting page
15. "/notification" = Notification Page
16. "/search?q=..." = central search for posts/communities.
17. "/communities/[communityID]/settings" = Community Settings Page for moderators/admins to manage community. (future)
18. "/user/saved" = Saved Posts of the user
19. "/user/myProfile" = To view my profile info like total karma, upvotes, downvotes, no of contribution
20. "/moderation/[communityID]" = Moderation Tools(future)
