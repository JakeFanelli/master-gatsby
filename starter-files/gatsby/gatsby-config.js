import dotenv from "dotenv";
dotenv.config({ path: ".env" });

export default {
  siteMetadata: {
    title: `Slicks Slices`,
    siteUrl: `https://gatsby.pizza`,
    description: `best pizza in Brooklyn!`,
  },
  plugins: [
    "gatsby-plugin-styled-components",
    {
      resolve: "gatsby-source-sanity",
      options: {
        projectId: "et1zzn6o",
        dataset: "production",
        watchMode: true,
        token: process.env.SANITY_TOKEN,
      },
    },
  ],
};
