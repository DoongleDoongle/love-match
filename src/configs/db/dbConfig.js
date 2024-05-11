export const supabaseConfig = {
  url: "https://okvuistnsoqjgcizkrap.supabase.co",
  anonKey:
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9rdnVpc3Ruc29xamdjaXprcmFwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQ4MjYwMzksImV4cCI6MjAzMDQwMjAzOX0.0LPJvVyqQ1_V4XBasgVZwhRC1E9RZ3r08OEBKeE5VsU",
};

export const table = {
  PARTICIPANTS: {
    name: "participants",
    columns: {
      ID: "id",
      NICKNAME: "nickname",
      CREATED_AT: "created_at",
    },
  },
  PLATFORMS: {
    name: "platforms",
    columns: {
      ID: "id",
      NAME: "name",
      DESCRIPTION: "description",
      CREATED_AT: "created_at",
      UPDATED_AT: "updated_at",
    },
  },
  CHOICES: {
    name: "choices",
    columns: {
      ID: "id",
      PLATFORM_ID: "platform_id",
      GROUP_ID: "group_id",
      CHOICE: "choice",
      CREATED_AT: "created_at",
      UPDATED_AT: "updated_at",
    },
  },
  ROOMS: {
    name: "rooms",
    columns: {
      ID: "id",
      PASSWORD: "password",
      CREATED_AT: "created_at",
    },
  },
  ROOMS_PARTICIPANTS: {
    name: "rooms_participants",
    columns: {
      ROOM_ID: "room_id",
      PARTICIPANT_ID: "participant_id",
      CHOICES: "choices",
      CREATED_AT: "created_at",
      UPDATED_AT: "updated_at",
    },
  },
};
