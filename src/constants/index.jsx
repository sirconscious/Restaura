import dish02 from "../assets/dish02.jpeg";
import dish01 from "../assets/dish01.jpg";
import dish03 from "../assets/dish03.jpeg";
import dish04 from "../assets/dish04.jpeg";
import dish05 from "../assets/dish05.jpeg";
import dish06 from "../assets/dish06.jpeg";
import dish07 from "../assets/dish07.jpeg";
import dish08 from "../assets/dish08.jpeg";
import dish09 from "../assets/dish09.jpeg";
import dish010 from "../assets/dish010.jpeg";

import italian from "../assets/italian.jpeg";
import japanese from "../assets/japanese.jpeg";
import indian from "../assets/indian.jpeg";

import { FaXTwitter, FaFacebook, FaInstagram } from "react-icons/fa6";

export const LINKS = [
  { text: "Dishes", targetId: "dishes" },
  { text: "About", targetId: "about" },
  { text: "Mission", targetId: "mission" },
  { text: "Expertise", targetId: "expertise" },
  { text: "Review", targetId: "review" },
  { text: "Contact", targetId: "contact" },
];

export const DISHES = [
  {
    image: dish01,
    title: "Tagine With vegtebals",
    description: "Moroccan stew of mixed vegetables slow-cooked with warm spices",
  },
  {
    image: dish02,
    title: "Suite Moroccan Saffa",
    description: "Elegant Moroccan suite with cultural charm",
  },
  {
    image: dish03,
    title: "Moroccan Harira",
    description: "Hearty Moroccan soup with tomatoes, lentils, chickpeas, and fragrant spices.",
  },
  {
    image: dish04,
    title: "Tacos",
    description: "Soft tortillas filled with seasoned meat, fresh salsa, and zesty toppings.",
  },
  {
    image: dish05,
    title: "Pizza",
    description: "Classic Italian-style pizza with a crispy crust, tangy tomato sauce, and melted cheese.",
  },
  {
    image: dish06,
    title: "Sushi",
    description: "Freshly rolled sushi with vinegared rice, fish, and vibrant vegetables.",
  },
  {
    image: dish07,
    title: "Chicken Bastila ",
    description: "Moroccan flaky pastry filled with spiced shredded chicken, almonds, and a hint of cinnamon, dusted with powdered sugar.",
  },
  {
    image: dish08,
    title: "Burger",
    description: "Juicy beef patty in a soft bun with fresh toppings and a special sauce.",
  },
  {
    image: dish09,
    title: "Pan-Fried Ribeye Steak",
    description: "Tender ribeye steak pan-seared to a perfect crust with rich, savory flavors.",
  },
  {
    image: dish010,
    title: "Moroccan chicken",
    description:
      "Golden-roasted Moroccan chicken marinated with spices and slow-cooked to perfection.",
  },
];

export const ABOUT = {
  header: "We love cooking!",
  content:
    "At RiadSaveur, we believe that great food goes beyond taste; it tells a story of dedication and creativity. From our chef's signature creations to our attentive service, every detail is curated to ensure your visit is nothing short of exceptional. Whether you're savoring our renowned Tikka Kebab or exploring our diverse menu inspired by global flavors, each dish is a celebration of flavor and innovation. Join us for a culinary journey where every bite leaves a lasting impression. Experience RiadSaveur—where every meal is a masterpiece.",
};

export const MISSION =
  "At our restaurant, our mission is to create delicious and memorable dining experiences.";

export const CUSINES = [
  {
    number: "01.",
    image: italian,
    title: "Italian",
    description:
      "Experience the flavors of Italy with our exquisite Italian cuisine, featuring traditional recipes and contemporary dishes.",
  },
  {
    number: "02.",
    image: japanese,
    title: "Japanese",
    description:
      "Delight in the art of Japanese culinary excellence, offering a fusion of classic and modern flavors.",
  },
  {
    number: "03.",
    image: indian,
    title: "Indian",
    description:
      "Indulge in the rich and diverse tastes of India, with a menu that celebrates the country's culinary heritage.",
  },
];

export const REVIEW = {
  name: "Xaviour Fernando",
  profession: "Food Critic",
  content:
    "“As a seasoned food critic, my expectations are always high when stepping into a new dining establishment. RiadSaveur, with its unassuming exterior and elegantly designed interior, promised a unique culinary experience from the moment I walked in. And I must say, it delivered beyond my expectations.”",
};

export const CONTACT = [
  { key: "address", value: "Address: 123 Main Street, Paris, France, 345678" },
  { key: "phone", value: "Phone: 123-456-7890" },
  { key: "email", value: "Email: contact@restaurant.com" },
];

export const SOCIAL_MEDIA_LINKS = [
  {
    href: "https://x.com/",
    icon: <FaFacebook fontSize={30} className="hover:opacity-80" />,
  },

  {
    href: "https://x.com/",
    icon: <FaInstagram fontSize={30} className="hover:opacity-80" />,
  },
  {
    href: "https://x.com/",
    icon: <FaXTwitter fontSize={30} className="hover:opacity-80" />,
  },
];

