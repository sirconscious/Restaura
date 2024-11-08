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
import { GrLocationPin } from "react-icons/gr";

// Links for the navigation
export const LINKS = [
  { text: "LINKS.dishes", targetId: "dishes" },
  { text: "LINKS.about", targetId: "about" },
  { text: "LINKS.mission", targetId: "mission" },
  { text: "LINKS.expertise", targetId: "expertise" },
  { text: "LINKS.review", targetId: "review" },
  { text: "LINKS.contact", targetId: "contact" },
];

// Dish details
export const DISHES = [
  {
    image: dish01,
    title: "DISHES.0.title", // Using translation key for title
    description: "DISHES.0.description", // Using translation key for description
    rating: 4,
    price: 80
  },
  {
    image: dish02,
    title: "DISHES.1.title",
    description: "DISHES.1.description",
    rating: 4.5,
    price: 55
  },
  {
    image: dish03,
    title: "DISHES.2.title",
    description: "DISHES.2.description",
    rating: 4,
    price: 80
  },
  {
    image: dish04,
    title: "DISHES.3.title",
    description: "DISHES.3.description",
    rating: 4,
    price: 80
  },
  {
    image: dish05,
    title: "DISHES.4.title",
    description: "DISHES.4.description",
    rating: 4,
    price: 80
  },
  {
    image: dish06,
    title: "DISHES.5.title",
    description: "DISHES.5.description",
    rating: 4,
    price: 80
  },
  {
    image: dish07,
    title: "DISHES.6.title",
    description: "DISHES.6.description",
    rating: 5,
    price: 80
  },
  {
    image: dish08,
    title: "DISHES.7.title",
    description: "DISHES.7.description",
    rating: 4,
    price: 80
  },
  {
    image: dish09,
    title: "DISHES.8.title",
    description: "DISHES.8.description",
    rating: 4,
    price: 80
  },
  {
    image: dish010,
    title: "DISHES.9.title",
    description: "DISHES.9.description",
    rating: 5,
    price: 80
  }
];



// About section text
export const ABOUT = {
  header: "ABOUT.header",  // key for translation
  content: "ABOUT.content" // key for translation
};

// Mission section text
export const MISSION =
  "MISSION.text";  // Translation key for the mission statement

// Cuisines section text
export const CUSINES = [
  {
    number: "01.",
    image: italian,
    title: "CUSINES.italian",  // Using translation keys
    description:
      "CUSINES.italian_description",  // Using translation keys
  },
  {
    number: "02.",
    image: japanese,
    title: "CUSINES.japanese",  // Using translation keys
    description:
      "CUSINES.japanese_description",  // Using translation keys
  },
  {
    number: "03.",
    image: indian,
    title: "CUSINES.indian",  // Using translation keys
    description:
      "CUSINES.indian_description",  // Using translation keys
  },
];

// Review section text
export const REVIEW = {
  name: "REVIEW.name",  // Translation key for reviewer name
  profession: "REVIEW.profession",  // Translation key for profession
  content:
    "REVIEW.content",  // Translation key for review content
};

// Contact information
export const CONTACT = [
  { key: "CONTACT.address", value: "CONTACT.address_value" },  // key for translation
  { key: "CONTACT.phone", value: "CONTACT.phone_value" },  // key for translation
  { key: "CONTACT.email", value: "CONTACT.email_value" },  // key for translation
];

// Social Media Links
export const SOCIAL_MEDIA_LINKS = [
  {
    href: "https://x.com/restaurant/",
    icon: <FaFacebook fontSize={30} className="hover:opacity-80" />,
  },
  {
    href: "https://x.com/restaurant/",
    icon: <FaInstagram fontSize={30} className="hover:opacity-80" />,
  },
  {
    href: "https://x.com/restaurant/",
    icon: <FaXTwitter fontSize={30} className="hover:opacity-80" />,
  },
];
