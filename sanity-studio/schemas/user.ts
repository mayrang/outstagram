export default {
  title: 'User',
  name: 'user',
  type: 'document',
  fields: [
    {
      title: 'Username',
      name: 'username',
      type: 'string',
    },
    {
      title: 'Name',
      name: 'name',
      type: 'string',
    },
    {
      title: 'Email',
      name: 'email',
      type: 'string',
    },
    {
      title: 'Image',
      name: 'image',
      type: 'string',
    },
    {
      title: 'Followings',
      name: 'followings',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [
            {
              type: 'user',
            },
          ],
        },
      ],
      validation: (Rule: any) => Rule.unique(),
    },
    {
      title: 'Followers',
      name: 'followers',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [
            {
              type: 'user',
            },
          ],
        },
      ],
      validation: (Rule: any) => Rule.unique(),
    },
  ],
}
