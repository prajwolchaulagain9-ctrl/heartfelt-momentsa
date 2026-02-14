export type PinProfile = "default" | "alt";

export interface PhotoItem {
  id: number;
  url: string;
  praise: string;
}

export interface PinContent {
  photos: PhotoItem[];
  question: {
    prefix?: string;
    highlight: string;
  };
}

const defaultPhotos: PhotoItem[] = [
  {
    id: 1,
    url: "https://scontent.fktm8-1.fna.fbcdn.net/v/t1.15752-9/622647849_2499634570432038_8263838319862653837_n.jpg?stp=dst-jpg_s640x640_tt6&_nc_cat=102&ccb=1-7&_nc_sid=0024fc&_nc_ohc=RaVe4h2P3x4Q7kNvwGzzR6N&_nc_oc=Adki1M6lmmB1rKVMYXyD9G0slsJlresdOj9_wgQ-84nyWb51I2mKh6m6j6kcOyyhiTzKsjp4xuTYAvvVZZW_48_Q&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=scontent.fktm8-1.fna&oh=03_Q7cD4gHOGMOMoCa_lyT6ZbX47vw7fNi06BgJJqRvu6e5klIjbQ&oe=69A80CDF",
    praise: "Your beauty shines from within",
  },
  {
    id: 2,
    url: "https://scontent.fktm8-1.fna.fbcdn.net/v/t1.15752-9/619251981_785952424515798_7570970355521022386_n.jpg?stp=dst-jpg_s640x640_tt6&_nc_cat=104&ccb=1-7&_nc_sid=0024fc&_nc_ohc=esnsn0IfFo8Q7kNvwG4wVBS&_nc_oc=AdkA_M_unTgIU1LkpPoHD9huyC7xlwGB_XzhnMjTqiRhiToCRpv-AYnuJ0MAUTKRId5jphp4XMAhgDe5QKb_IupJ&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=scontent.fktm8-1.fna&oh=03_Q7cD4gFt_JkMVod6JGLfXWLJGyhshL5tkIfYoSmbp97nxJTwag&oe=69A8285E",
    praise: "That smile takes my breath away",
  },
  {
    id: 3,
    url: "https://scontent.fktm8-1.fna.fbcdn.net/v/t1.15752-9/624278459_1227251148746712_1618744897501690900_n.jpg?stp=dst-jpg_s640x640_tt6&_nc_cat=108&ccb=1-7&_nc_sid=0024fc&_nc_ohc=XYbVIuLj5ycQ7kNvwH1fsJ8&_nc_oc=AdmEfGqsdvpifkd8DpuYRexolzoHqfKU1zSgtlHqDQ_tmVSGebDAin0heyvJd3oI8FY9Z7IWY87Hol6x_kyIk-E1&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=scontent.fktm8-1.fna&oh=03_Q7cD4gF3vIr5RxWNoBken-EyP6EpmqcyWi25z9siUdEQ5xJWmQ&oe=69A82100",
    praise: "Your grace mesmerizes me",
  },
  {
    id: 4,
    url: "https://scontent.fktm8-1.fna.fbcdn.net/v/t1.15752-9/620637700_1572543807533655_6255011560553014012_n.jpg?stp=dst-jpg_s640x640_tt6&_nc_cat=108&ccb=1-7&_nc_sid=0024fc&_nc_ohc=48oRdPFoTWMQ7kNvwG97bJa&_nc_oc=Admjxze_j5eSwSApiMSftIOLfcd5cVjNhFfKOlYMAAiA43CHs-R1NuMLFdvOfPXbV3fB4CNKtwjLAZ3NC-Cuzuy-&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=scontent.fktm8-1.fna&oh=03_Q7cD4gHe4Q5-EURDCLTiRh0P2pu3r5UUKYXeOFSPPQ05r5p50Q&oe=69A82389",
    praise: "Every moment with you is pure magic",
  },
];

const altPhotos: PhotoItem[] = [
  {
    id: 1,
    url: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=800&q=80",
    praise: "A calm moment, just for us",
  },
  {
    id: 2,
    url: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=800&q=80",
    praise: "New memories in a new light",
  },
  {
    id: 3,
    url: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=800&q=80",
    praise: "A view worth holding onto",
  },
  {
    id: 4,
    url: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=800&q=80",
    praise: "Every day feels like a trip",
  },
];

export const pinContentByProfile: Record<PinProfile, PinContent> = {
  default: {
    photos: defaultPhotos,
    question: {
      prefix: "Mrs. Shyness Final Boss,",
      highlight: "will you be my Valentine?",
    },
  },
  alt: {
    photos: altPhotos,
    question: {
      highlight: "Will you be my Valentine?",
    },
  },
};

export const getPinContent = (profile: PinProfile | null): PinContent =>
  pinContentByProfile[profile ?? "default"];
