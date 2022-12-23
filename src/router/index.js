import Vue from "vue";
import VueRouter from "vue-router";
import * as Sentry from "@sentry/vue";
import { BrowserTracing } from "@sentry/tracing";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "SubConverter",
    component: () => import("../views/Subconverter.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

Sentry.init({
  Vue,
  dsn: "https://8543059a95e5420886767789ff62559c@o1074926.ingest.sentry.io/4504378730151936",
  integrations: [
    new BrowserTracing({
      routingInstrumentation: Sentry.vueRouterInstrumentation(router),
      tracePropagationTargets: ["localhost", "my-site-url.com", /^\//],
    }),
  ],
  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
});

export default router;
