import Lottie from "lottie-react";
import loading_animation from "../assets/Loading.json";

export default function Loading() {
  return <Lottie animationData={loading_animation} loop={true} />;
}
