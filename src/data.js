// Geezo Music Streaming App authentic dataset based on Sketch artboards

export const currentUser = {
  name: 'John Huston',
  email: 'Muffiluma@gmail.com',
  phone: '+65 3658 9211',
  gender: 'Male',
  avatar: 'profileUser',
  playlistsCount: 22,
  followersCount: '360 K',
  followingCount: 56,
};

export const songs = [
  {
    id: 's1',
    title: 'Come to me',
    artist: 'One Republic',
    album: 'Native Nights',
    duration: '3:05',
    progress: '2:46',
    image: 'comeToMe',
    plays: '1.4M',
    isLiked: true,
    lyrics: `Come to me in the early morning dawn
Where shadows melt and the lights come on
It is a long established fact that a rhythm can soothe your heart
And keep our melodies right from the start
When the night fades away, stay with me...`,
  },
  {
    id: 's2',
    title: 'Nice For What',
    artist: 'Avinci John',
    album: 'Scorpion Hits',
    duration: '3:30',
    progress: '1:15',
    image: 'niceForWhat',
    plays: '980K',
    isLiked: false,
    lyrics: `Everybody wants the good life
Dancing under the city neon light
Nice for what, baby you do you
Keep it moving all through the night...`,
  },
  {
    id: 's3',
    title: 'Where can I get some ?',
    artist: 'Suji Wong',
    album: 'Help XX',
    duration: '3:12',
    progress: '0:45',
    image: 'whereCanIGet',
    plays: '820K',
    isLiked: true,
    lyrics: `Looking for that special groove
Nothing else got me making this move
Where can I get some peace of mind
Or that harmony we left behind...`,
  },
  {
    id: 's4',
    title: 'Pray For You',
    artist: 'The Weekend',
    album: 'Starboy Sessions',
    duration: '4:02',
    progress: '2:10',
    image: 'prayForYou',
    plays: '350K',
    isLiked: true,
    lyrics: `Late night drives on the empty highway
Thinking about what you told me Friday
Pray for you, pray for me too
We made it through the darkest view...`,
  },
  {
    id: 's5',
    title: 'Do it',
    artist: 'Milian Luu',
    album: 'Do It EP',
    duration: '2:55',
    progress: '0:00',
    image: 'doIt',
    plays: '640K',
    isLiked: false,
    lyrics: `Step on the gas, never look back
Every second counts on this track
Just do it now, do it loud!`,
  },
  {
    id: 's6',
    title: 'Run Run Run',
    artist: 'Avinci John',
    album: 'Speedway',
    duration: '3:18',
    progress: '0:00',
    image: 'runRunRun',
    plays: '490K',
    isLiked: false,
    lyrics: `Run across the borderlines
Counting down the signs
Run run run till the morning shines...`,
  },
  {
    id: 's7',
    title: 'Fall out boy',
    artist: 'Fall Out Boy',
    album: 'Save Rock and Roll',
    duration: '3:45',
    progress: '0:00',
    image: 'fallOutBoy',
    plays: '1.1M',
    isLiked: true,
    lyrics: `Remember me for centuries
Standing in the golden freeze...`,
  },
  {
    id: 's8',
    title: 'Why do we use it ?',
    artist: 'Suji Wong',
    album: 'Reflections',
    duration: '2:40',
    progress: '0:00',
    image: 'sujiWong',
    plays: '320K',
    isLiked: false,
    lyrics: `Questions in the twilight breeze
Whispering between the trees...`,
  },
];

export const albums = [
  {
    id: 'a1',
    title: 'No 9',
    artist: 'Girl Generation',
    year: '2024',
    tracksCount: 12,
    image: 'whereCanIGet',
  },
  {
    id: 'a2',
    title: 'Help XX',
    artist: 'Suji Wong',
    year: '2024',
    tracksCount: 10,
    image: 'sujiWong',
  },
  {
    id: 'a3',
    title: 'Native Nights',
    artist: 'One Republic',
    year: '2024',
    tracksCount: 14,
    image: 'comeToMe',
  },
  {
    id: 'a4',
    title: 'Scorpion Hits',
    artist: 'Avinci John',
    year: '2024',
    tracksCount: 16,
    image: 'niceForWhat',
  },
];

export const playlists = [
  {
    id: 'p1',
    title: 'Rap Soul',
    subtitle: 'Rap Gangz, Rap Party, Top Hits, Beats & Rhymes',
    tracksCount: '45 tracks',
    duration: '2.4 hrs',
    image: 'doIt',
    description: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.',
  },
  {
    id: 'p2',
    title: 'Rulia and Remé',
    subtitle: 'Curated by Jeeny Benmy',
    tracksCount: '32 tracks',
    duration: '1.8 hrs',
    image: 'runRunRun',
    description: 'Fresh chill beats, acoustic guitars, and summer daydream sounds.',
  },
  {
    id: 'p3',
    title: 'Geez Weekly',
    subtitle: 'Top 50 trending songs on Geez charts',
    tracksCount: '50 tracks',
    duration: '3.1 hrs',
    image: 'prayForYou',
    description: 'Updated every Monday with the hottest worldwide releases.',
  },
  {
    id: 'p4',
    title: 'Hip-Hop Smash Hits',
    subtitle: 'Heavy basslines and lyrical masterpieces',
    tracksCount: '60 tracks',
    duration: '3.5 hrs',
    image: 'niceForWhat',
    description: 'The defining trap, boom-bap, and hip-hop anthems.',
  },
];

export const artists = [
  {
    id: 'art1',
    name: 'One Republic',
    monthlyListeners: '2.8M',
    genre: 'Pop Rock',
    image: 'comeToMe',
    topSong: 'Come to me',
  },
  {
    id: 'art2',
    name: 'Suji Wong',
    monthlyListeners: '1.2M',
    genre: 'K-Pop & R&B',
    image: 'sujiWong',
    topSong: 'Where can I get some ?',
  },
  {
    id: 'art3',
    name: 'Avinci John',
    monthlyListeners: '980K',
    genre: 'Electronic & Dance',
    image: 'niceForWhat',
    topSong: 'Nice For What',
  },
  {
    id: 'art4',
    name: 'Maria Lucii',
    monthlyListeners: '640K',
    genre: 'Indie Pop',
    image: 'doIt',
    topSong: 'Summer Rain',
  },
  {
    id: 'art5',
    name: 'Suzy Bae',
    monthlyListeners: '820K',
    genre: 'Acoustic Soul',
    image: 'whereCanIGet',
    topSong: 'Winter Breeze',
  },
];

export const radioStations = [
  {
    id: 'r1',
    name: 'Boney Radio',
    frequency: 'GeezFM 98Hz',
    host: 'Howard Lawence',
    timeSlot: '9 AM - 11 AM',
    genre: 'R&B / Soul',
    image: 'radioStation',
    listeners: '14.2K Live',
    description: 'Collection of the best Radio stations of Geez, constantly updated weekly.',
  },
  {
    id: 'r2',
    name: 'Geez Radio Weekly',
    frequency: 'GeezFM 104.2Hz',
    host: 'DJ Pulse',
    timeSlot: '24/7 Live Stream',
    genre: 'Electronic & Chart Hits',
    image: 'radioLive',
    listeners: '28.5K Live',
    description: 'Non-stop club bangers, festival remixes, and fresh DJ sets.',
  },
  {
    id: 'r3',
    name: 'Live Peep Show',
    frequency: 'GeezFM 92.5Hz',
    host: 'Sarah Vance',
    timeSlot: '7 PM - 9 PM',
    genre: 'Acoustic Sessions & Interviews',
    image: 'prayForYou',
    listeners: '8.9K Live',
    description: 'Unplugged sessions and candid artist conversations.',
  },
];

export const musicVideos = [
  {
    id: 'mv1',
    title: 'Pray For You',
    artist: 'The Weekend',
    views: '350 K',
    image: 'prayForYou',
    duration: '4:15',
  },
  {
    id: 'mv2',
    title: 'Run Run Run',
    artist: 'Avinci John',
    views: '220 K',
    image: 'runRunRun',
    duration: '3:22',
  },
  {
    id: 'mv3',
    title: 'Do it Live',
    artist: 'Milian Luu',
    views: '185 K',
    image: 'doIt',
    duration: '3:05',
  },
];

export const searchTags = [
  'Fall out boy',
  'Good girl',
  'Girl generation',
  'Imagine Dragons',
  'One Republic',
  'Avinci John',
  'Suji Wong',
  'The Weekend',
];

export const equalizerPresets = [
  'SKA',
  'SOFT',
  'SOFTROCK',
  'TECHNO',
  'VOCAL',
  'JAZZ',
  'HIP HOP',
  'BASS BOOST',
];

export const userProfile = currentUser;
