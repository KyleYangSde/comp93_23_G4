import axios from "axios";

export default axios.create({
  baseURL: "https://www.googleapis.com/youtube/v3",
  params: {
    part: "snippet",
    key: "AIzaSyC9VuzT9pZBVg-Ip3T1tPp3y4_gZRbwP38",
  },
});
