import { createRouter, createWebHistory } from "vue-router";

export default createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      component: () => import("./pages/Home.vue"),
    },
    {
      path: "/leaderboards",
      component: () => import("./pages/leaderboards/Leaderboards.vue"),
      children: [
        {
          path: "",
          component: () => import("./pages/leaderboards/AllGames.vue"),
        },
        {
          path: ":abbreviation",
          component: () => import("./pages/leaderboards/[abbreviation].vue"),
          children: [
            {
              path: ":category",
              component: () => import("./pages/leaderboards/[category].vue"),
            },
          ],
        },
      ],
    },
  ],
});
