import path from "path";
import fetch from "isomorphic-fetch";

async function turnPizzasIntoPages({ graphql, actions }) {
  //1. get a template for this page
  const pizzaTemplate = path.resolve("./src/templates/Pizza.js");
  //2. query all pizzas
  const { data } = await graphql(`
    query {
      pizzas: allSanityPizza {
        nodes {
          name
          slug {
            current
          }
        }
      }
    }
  `);
  //3. loop over each pizza and create a page for it
  data.pizzas.nodes.forEach((pizza) => {
    actions.createPage({
      path: `pizza/${pizza.slug.current}`,
      component: pizzaTemplate,
      context: {
        slug: pizza.slug.current,
      },
    });
  });
}

async function turnToppingsIntoPages({ graphql, actions }) {
  //1. get a template for this page
  const toppingTemplate = path.resolve(`./src/pages/pizzas.js`);
  //2. query all toppings
  const { data } = await graphql(`
    query {
      toppings: allSanityTopping {
        nodes {
          name
          id
        }
      }
    }
  `);
  //3. createPage for that topping
  data.toppings.nodes.forEach((topping) => {
    actions.createPage({
      path: `topping/${topping.name}`,
      component: toppingTemplate,
      context: {
        topping: topping.name,
        // TODO Regex for topping
        toppingRegex: `/${topping.name}/i`,
      },
    });
  });
  //4. Pass topping data to pizza.js
}

async function fetchBeersAndTurnIntoNodes({
  actions,
  createNodeId,
  createContentDigest,
}) {
  //1. Fetch a list of the beers
  const res = await fetch("https://api.sampleapis.com/beers/ale");
  const beers = await res.json();
  //2. Loop over each one
  for (const beer of beers) {
    //create a node for each beer
    const nodeMeta = {
      id: createNodeId(`beer-${beer.name}`),
      parent: null,
      children: [],
      internal: {
        type: "Beer",
        mediaType: "application/json",
        contentDigest: createContentDigest(beer),
      },
    };
    actions.createNode({
      ...beer,
      ...nodeMeta,
    });
  }
  //3. Create a node for that beer
}

export async function sourceNodes(params) {
  await Promise.all([fetchBeersAndTurnIntoNodes(params)]);
}

export async function createPages(params) {
  //Create pages dynamically
  //wait for all promises to be resolved before finishing this function
  await Promise.all([
    turnPizzasIntoPages(params),
    turnToppingsIntoPages(params),
  ]);
  //1. pizzas
  //2. toppings
  //3. slicemasters
}
