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
        - User can save upto 10 drafts.
        - They will be shown and opened through button of profile dropdown. Initially we can't save media files and links in draft.
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
    2. (Future ML Feature) **Semantic Search** -> Find posts by meaning, not just keywords.

### Gamification (Karma System)

    1. Karma = Total upvotes - downvotes
    2. Karma unlocks features (like community creation).
    3. Visible in user profile.

## Planned ML/DL Features (Phase 2)

    1. Personalized Feed -> Recommend posts based on user behavior.
    2. Toxicity Detection -> Flag/report offensive comments using NLP.
    3. Auto-Tagging -> NLP to generate suggested tags for new posts.
    4. Semantic Search -> Use embeddings for meaning-based search
    5. Trend Prediction -> Early prediction of which posts will become popular.
