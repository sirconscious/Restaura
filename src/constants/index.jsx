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
  { key: "address", value: "Address: 123 Main Street, Paris, France, 345678" },
      { key: "phone", value: "Phone: 123-456-7890" },
      { key: "email", value: "Email: contact@restaurant.com" }
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

export const tablesInfo = [{
    "table_id": 1,
    "description": "Cozy corner table near the window with a view.",
    "max_capacity": 4,
    "features": ["Window view", "Comfortable seating", "Natural lighting"]
  },
  {
    "table_id": 2,
    "description": "Intimate two-person table by the fireplace.",
    "max_capacity": 2,
    "features": ["Fireplace nearby", "Perfect for couples", "Warm lighting"]
  },
  {
    "table_id": 3,
    "description": "Large family table near the play area.",
    "max_capacity": 6,
    "features": ["Family-friendly", "Near play area", "High chairs available"]
  },
  {
    "table_id": 4,
    "description": "Spacious table suitable for groups or celebrations.",
    "max_capacity": 8,
    "features": ["Private area", "Ideal for gatherings", "Soundproof"]
  },
  {
    "table_id": 5,
    "description": "Quiet table in the library-themed area for study or work.",
    "max_capacity": 2,
    "features": ["Quiet ambiance", "Ideal for work or study", "Good lighting"]
  }
]

export const Meals = [
  {
    id: 1,
    title: "Tagine With Vegetables",
    description: "Moroccan stew of mixed vegetables slow-cooked with warm spices",
    price: 110,
    category: "Moroccan",
    preparation_time: "2h",
    image: dish01,
  },
  {
    id: 2,
    title: "Suite Moroccan Saffa",
    description: "Elegant Moroccan suite with cultural charm",
    price: 150,
    category: "Moroccan",
    preparation_time: "1h 30m",
    image: dish02,
  },
  {
    id: 3,
    title: "Moroccan Harira",
    description: "Hearty Moroccan soup with tomatoes, lentils, chickpeas, and fragrant spices.",
    price: 80,
    category: "Moroccan",
    preparation_time: "45m",
    image: dish03,
  },
  {
    id: 4,
    title: "Tacos",
    description: "Soft tortillas filled with seasoned meat, fresh salsa, and zesty toppings.",
    price: 90,
    category: "Mexican",
    preparation_time: "30m",
    image: dish04,
  },
  {
    id: 5,
    title: "Pizza",
    description: "Classic Italian-style pizza with a crispy crust, tangy tomato sauce, and melted cheese.",
    price: 120,
    category: "Italian",
    preparation_time: "40m",
    image: dish05,
  },
  {
    id: 6,
    title: "Sushi",
    description: "Freshly rolled sushi with vinegared rice, fish, and vibrant vegetables.",
    price: 190,
    category: "Japanese",
    preparation_time: "1h",
    image: dish06,
  },
  {
    id: 7,
    title: "Chicken Bastila",
    description: "Moroccan flaky pastry filled with spiced shredded chicken, almonds, and a hint of cinnamon, dusted with powdered sugar.",
    price: 170,
    category: "Moroccan",
    preparation_time: "2h 15m",
    image: dish07,
  },
  {
    id: 8,
    title: "Burger",
    description: "Juicy beef patty in a soft bun with fresh toppings and a special sauce.",
    price: 100,
    category: "American",
    preparation_time: "25m",
    image: dish08,
  },
  {
    id: 9,
    title: "Pan-Fried Ribeye Steak",
    description: "Tender ribeye steak pan-seared to a perfect crust with rich, savory flavors.",
    price: 230,
    category: "American",
    preparation_time: "35m",
    image: dish09,
  },
  {
    id: 10,
    title: "Moroccan Chicken",
    description: "Golden-roasted Moroccan chicken marinated with spices and slow-cooked to perfection.",
    price: 140,
    category: "Moroccan",
    preparation_time: "1h 45m",
    image: dish010,
  },
  {
    id: 11,
    title: "Vegetable Sushi Roll",
    description: "Delightful sushi rolls filled with fresh, crisp vegetables and seasoned rice.",
    price: 160,
    category: "Japanese",
    preparation_time: "50m",
    image: dish01,
  },
  {
    id: 12,
    title: "Beef Tacos",
    description: "Spiced beef tacos served with fresh salsa, guacamole, and cheese.",
    price: 95,
    category: "Mexican",
    preparation_time: "30m",
    image: dish02,
  },
  {
    id: 13,
    title: "Seafood Pizza",
    description: "Italian-style pizza topped with shrimp, calamari, and a sprinkle of herbs.",
    price: 150,
    category: "Italian",
    preparation_time: "50m",
    image: dish03,
  },
  {
    id: 14,
    title: "Grilled Salmon",
    description: "Perfectly grilled salmon fillet served with a lemon butter sauce.",
    price: 200,
    category: "Seafood",
    preparation_time: "40m",
    image: dish04,
  },
  {
    id: 15,
    title: "Lamb Tagine",
    description: "Slow-cooked Moroccan lamb stew with prunes, almonds, and a blend of spices.",
    price: 180,
    category: "Moroccan",
    preparation_time: "2h 30m",
    image: dish05,
  },
  {
    id: 16,
    title: "Chicken Caesar Salad",
    description: "Fresh greens topped with grilled chicken, Parmesan cheese, and Caesar dressing.",
    price: 85,
    category: "Salad",
    preparation_time: "20m",
    image: dish06,
  },
  {
    id: 17,
    title: "Chocolate Fondant",
    description: "Rich and gooey chocolate cake with a molten center, served with vanilla ice cream.",
    price: 70,
    category: "Dessert",
    preparation_time: "25m",
    image: dish07,
  },
  {
    id: 18,
    title: "Shrimp Pad Thai",
    description: "Classic Thai stir-fried noodles with shrimp, peanuts, and a tangy sauce.",
    price: 140,
    category: "Thai",
    preparation_time: "45m",
    image: dish08,
  },
  {
    id: 19,
    title: "Vegetarian Couscous",
    description: "Steamed couscous served with a medley of vegetables and spices.",
    price: 100,
    category: "Moroccan",
    preparation_time: "1h",
    image: dish09,
  },
  {
    id: 20,
    title: "Cheesecake",
    description: "Creamy New York-style cheesecake with a graham cracker crust.",
    price: 75,
    category: "Dessert",
    preparation_time: "1h 15m",
    image: dish010,
  },
];
