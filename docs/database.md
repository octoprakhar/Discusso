## Database Design Overview

The database is divided into three categories:

- **Pure Database Tables** → store main entities (users, posts, comments, etc.)
- **Interaction Tables** → store user interactions (votes, joins, etc.)
- **Preference Tables** -> store user specific actions (saving post, blocking user(future), hiding posts(future))

Below is the high-level schema visualization:

### Pure database entities overview:

1. **User**: It will consist of

```
{
    id:Int, //userId (Primary Key)
    createdAt:Date_time, //When this user joined discusso
    userName: String,
    email: String,
    password: String,
    Gender: String?,
    DisplayName: String?,
    userIcon: String?, //Profile photo of a user
    userLocation: String/JSON, //Not decided whether to store json or string. I mean whether to store lat-lang or normal address.
}

```

2. **Community**:

```
{
    id: Int, //Primary Key
    createdAt: DateTime,
    creatorId: Int, //(Foreign Key to user Table) which user founded this community
    name: STring,
    logo: String?,
    title: String,
    description: String?
}
```

3. **Post**:

```
{
    id: Int, //(Primary Key)
    createdAt: DateTime,
    communityId: Int, //(Foreign Key) this post is of which community
    userId: Int, //(Foreign Key to user Table) which user created this post
    title: String,
    description: String?,
      media JSONB, -- e.g. { "images": [...], "video": "url", "links": [...] }
// First version of my app won't fully support video till now. It may get broken!!!
}
```

4. **Comments**:

```
{
    id: Int, //(Primary Key)
    createdAt:DateTime,
    postId: Int, //(Foreign key to post table) This comment is on which post
    userId: Int, //(Foreign key to user table) This comment is done by which user
    parentCommentId: Int?, //Is it a direct comment to post, or is it a reply to another comment.
    content: String
}
```

5. **Draft**: **A user can't have more than 10 drafts**. In the first version of my app, it is not supporting to save media or links in draft

```
{
    id: Int, //(Primary key)
    lastEditedAt: Date_time,
    userId: Int, //(Foreign key to user table) which user's draft is this
    selectedCommunityId: Int?, //(Foreign key to community table) does user before saving to draft selected any community to do the post?
    title: String,
    body: String?
}
```

### Interaction database entities overview:

1. **CommunityInteraction** : In the first version of app, only interaction between a user and an existing community is a user can join a community or leave it. In upcoming versions improvement whill be there.

{
id: Int, //(Primary Key)
joinedAt: Date_time, // when user joined this community
communityId: Int, //(Foreign Key to community table)
userId: Int, // (Foreign key to user table)
isMember: Boolean, //Default True
}

2. **PostInteraction**: User whenther upvoted or downvoted a post. If there is 1 in upvote column that means user has upvoted and -1 means user has not upvoted and same for downvote.

```
{
    id: Int,// (PK)
    lastUpdatedAt:Date_time, //Last updation of this interaction
    postId: Int, //(FK to post database)
    userId: Int, //(FK to user table)
    vote: Int //Either 1 for upvote and -1 for downvote

}
```

3. **CommentInteraction**: Same as PostInteraction table.

```
{
    id: INt,//PK
    lastUpdatedAt: Date_Time,
    commentId: Int, //(FK to comments table)
    userId: Int, //(FK to user table)
    vote: Int //Either 1 for upvote and -1 for downvote
}
```

### Preference database entities overview:

2. **PostPreferences**: This table stores user-specific preferences on posts. Only the user can see these settings.

```
{
    userId: Int, // FK and Primary Key
    postId: Int, // FK and Primary Key

    isSaved: Boolean, // default false
    isHidden: Boolean, // future feature
    isReported: Boolean, // future feature

    lastUpdatedAt: DateTime
}

```
