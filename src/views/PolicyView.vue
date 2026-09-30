<script setup lang="ts">
import { RouterLink } from 'vue-router'

import { telegramBotUrl } from '@/data/site'
</script>

<template>
  <div class="container py-5">
    <div class="row">
      <div class="col-lg-9 mx-auto">
        <h1 class="mb-3">Privacy Policy</h1>
        <p class="text-muted">Last updated: September 2026</p>

        <p>
          Video Hunter (myvideohunter.com) is a free tool that downloads videos from X (Twitter), Reddit and Bluesky.
          This page explains what information is processed when you use it.
        </p>

        <h2 class="h4 mt-4">What we do not collect</h2>
        <ul>
          <li>There are no accounts and no sign-up, so we hold no names, email addresses or passwords.</li>
          <li>We do not store the videos you download. They are streamed from the platform's own content delivery network.</li>
          <li>We do not sell personal information.</li>
        </ul>

        <h2 class="h4 mt-4">What is processed</h2>
        <ul>
          <li>
            <strong>Server and CDN logs.</strong> Our hosting and content delivery provider records standard request
            data: IP address, browser type, the page requested and timestamps. This is used to operate the service and
            to detect abuse.
          </li>
          <li>
            <strong>The links you submit.</strong> When you paste a link, it is sent to our API so the video can be
            resolved. The resolved page is stored so the same link can be served again; it contains the post's text,
            thumbnail and download URLs, not any information about you.
          </li>
          <li>
            <strong>Google Analytics.</strong> We use Google Analytics to understand how the site is used (pages
            viewed, approximate location, device type). It sets cookies and receives your IP address. See
            <a href="https://policies.google.com/privacy" target="_blank" rel="noopener">Google's privacy policy</a>.
          </li>
          <li>
            <strong>Google AdSense.</strong> Advertising on this site is served by Google. Google and its partners use
            cookies (including the DoubleClick cookie) to serve ads based on your visits to this and other sites. You
            can opt out of personalised advertising in
            <a href="https://myadcenter.google.com/" target="_blank" rel="noopener">Google Ad Settings</a> or at
            <a href="https://www.aboutads.info/choices/" target="_blank" rel="noopener">aboutads.info</a>.
          </li>
        </ul>

        <h2 class="h4 mt-4">Cookies</h2>
        <p>
          Cookies on this site come from Google Analytics and Google AdSense. You can block or delete them in your
          browser settings; the downloader itself works without cookies.
        </p>

        <h2 class="h4 mt-4">Your rights</h2>
        <p>
          If you are in the EEA or the UK (GDPR) or in California (CCPA), you can ask for access to, correction of, or
          deletion of your personal data, and you can object to processing. Because we do not hold accounts or
          submitted contact details, most requests relate to analytics and advertising data, which is controlled by
          Google. We will help where we can.
        </p>

        <h2 class="h4 mt-4">Children</h2>
        <p>
          This service is not directed at children under 13 and we do not knowingly collect their personal
          information.
        </p>

        <h2 class="h4 mt-4">Contact</h2>
        <p>
          For any privacy request, message us on Telegram at
          <a :href="telegramBotUrl" target="_blank" rel="noopener">@MyVideoHunterBot</a>.
        </p>

        <h2 class="h4 mt-4">Copyright</h2>
        <p>
          Video Hunter does not host videos. Please make sure you have the right to download the content you save, and
          respect the rights of content creators.
        </p>

        <p class="mt-4"><RouterLink to="/">Back to the video downloader</RouterLink></p>
      </div>
    </div>
  </div>
</template>
