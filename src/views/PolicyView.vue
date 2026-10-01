<script setup lang="ts">
import { RouterLink } from 'vue-router'

import { useLocale } from '@/composables/useLocale'
import { pagePaths } from '@/data/locales'
import { telegramBotUrl } from '@/data/site'

const { copy, localize } = useLocale()
</script>

<template>
  <div class="container py-5">
    <div class="row">
      <div class="col-lg-9 mx-auto">
        <h1 class="mb-3">{{ copy.policy.heading }}</h1>
        <p class="text-muted">{{ copy.policy.updated }}</p>

        <p>{{ copy.policy.intro }}</p>

        <h2 class="h4 mt-4">{{ copy.policy.notCollectedHeading }}</h2>
        <ul>
          <li v-for="item in copy.policy.notCollected" :key="item">{{ item }}</li>
        </ul>

        <h2 class="h4 mt-4">{{ copy.policy.processedHeading }}</h2>
        <ul>
          <li>
            <strong>{{ copy.policy.processedServer.term }}</strong> {{ copy.policy.processedServer.text }}
          </li>
          <li>
            <strong>{{ copy.policy.processedLinks.term }}</strong> {{ copy.policy.processedLinks.text }}
          </li>
          <li>
            <strong>{{ copy.policy.processedAnalytics.term }}</strong> {{ copy.policy.processedAnalytics.text
            }}<a href="https://policies.google.com/privacy" target="_blank" rel="noopener">{{
              copy.policy.processedAnalytics.link
            }}</a
            >{{ copy.policy.processedAnalytics.after }}
          </li>
          <li>
            <strong>{{ copy.policy.processedAdsense.term }}</strong> {{ copy.policy.processedAdsense.text
            }}<a href="https://myadcenter.google.com/" target="_blank" rel="noopener">{{
              copy.policy.processedAdsense.link
            }}</a
            >{{ copy.policy.processedAdsense.between
            }}<a href="https://www.aboutads.info/choices/" target="_blank" rel="noopener">{{
              copy.policy.processedAdsense.link2
            }}</a
            >{{ copy.policy.processedAdsense.after }}
          </li>
        </ul>

        <h2 class="h4 mt-4">{{ copy.policy.signInHeading }}</h2>
        <p>{{ copy.policy.signInIntro }}</p>
        <p>{{ copy.policy.signInLead }}</p>
        <ul>
          <li v-for="item in copy.policy.signInItems" :key="item.term">
            <strong>{{ item.term }}</strong> {{ item.text }}
          </li>
        </ul>

        <h2 class="h4 mt-4">{{ copy.policy.chatHeading }}</h2>
        <p>{{ copy.policy.chatBody1 }}</p>
        <p>{{ copy.policy.chatBody2 }}</p>

        <h2 class="h4 mt-4">{{ copy.policy.cookiesHeading }}</h2>
        <p>{{ copy.policy.cookiesBody1 }}</p>
        <p>{{ copy.policy.cookiesBody2 }}</p>

        <h2 class="h4 mt-4">{{ copy.policy.rightsHeading }}</h2>
        <p>
          {{ copy.policy.rights.before
          }}<RouterLink :to="localize(pagePaths.library)">{{ copy.policy.rights.link }}</RouterLink
          >{{ copy.policy.rights.after }}
        </p>

        <h2 class="h4 mt-4">{{ copy.policy.childrenHeading }}</h2>
        <p>{{ copy.policy.childrenBody }}</p>

        <h2 class="h4 mt-4">{{ copy.policy.contactHeading }}</h2>
        <p>
          {{ copy.policy.contact.before
          }}<a :href="telegramBotUrl" target="_blank" rel="noopener">{{ copy.telegramHandle }}</a
          >{{ copy.policy.contact.after }}
        </p>

        <h2 class="h4 mt-4">{{ copy.policy.copyrightHeading }}</h2>
        <p>{{ copy.policy.copyrightBody }}</p>

        <p class="mt-4">
          <RouterLink :to="localize(pagePaths.home)">{{ copy.policy.backToDownloader }}</RouterLink>
        </p>
      </div>
    </div>
  </div>
</template>
