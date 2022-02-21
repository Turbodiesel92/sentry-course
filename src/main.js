import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import "@/assets/main.pcss"
import * as Sentry from "@sentry/vue";
import { Integrations } from "@sentry/tracing";

const app = createApp(App)
Sentry.init({
    app,
    dsn: "https://e795f0a85ad54b8f9bf20ac89d304c68@o1143672.ingest.sentry.io/6221832",
    logErrors: true,
    RELEASE: __SENTRY_RELEASE__,
    integrations: [
        new Integrations.BrowserTracing({
            routingInstrumentation: Sentry.vueRouterInstrumentation(router),
            tracingOrigins: ["localhost", "my-site-url.com", /^\//],
        }),
    ],
    // Set tracesSampleRate to 1.0 to capture 100%
    // of transactions for performance monitoring.
    // We recommend adjusting this value in production
    tracesSampleRate: 1.0,
});
app.use(router)
    .mount('#app')
