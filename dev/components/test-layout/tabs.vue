<template>
  <div>
    <div class="layout-padding">
      <p class="caption desktop-only">
        On a real mobile device Tabs look a little different
        in the sense that arrows won't be shown since user can
        pan (touch action) through the menu.
        <br>
      </p>

      <p>
        Check Layout source code to see how you can link
        tabs to navigation routes.
      </p>

      <q-tabs>
        <q-tab icon="mail">Mails</q-tab>
        <q-tab icon="alarm">Alarms</q-tab>
        <q-tab icon="movie">Movies</q-tab>
        <q-tab icon="mail">Mails</q-tab>
        <q-tab icon="alarm">Alarms</q-tab>
        <q-tab icon="movie">Movies</q-tab>
        <q-tab icon="mail">Mails</q-tab>
        <q-tab icon="alarm">Alarms</q-tab>
        <q-tab icon="movie">Movies</q-tab>
        <q-tab icon="mail">Mails</q-tab>
        <q-tab icon="alarm">Alarms</q-tab>
        <q-tab icon="movie">Movies</q-tab>
        <q-tab icon="mail">Mails</q-tab>
        <q-tab icon="alarm">Alarms</q-tab>
        <q-tab icon="movie">Movies</q-tab>
        <q-tab icon="mail">Mails</q-tab>
        <q-tab icon="alarm">Alarms</q-tab>
        <q-tab icon="movie">Movies</q-tab>
      </q-tabs>

      <p class="caption">
        They come in all colors.
      </p>
      <div class="group">
        <q-tabs class="primary">
          <q-tab icon="mail">Mails</q-tab>
          <q-tab icon="alarm">Alarms</q-tab>
          <q-tab icon="movie">Movies</q-tab>
        </q-tabs>
        <q-tabs class="amber clear">
          <q-tab icon="mail">Mails</q-tab>
          <q-tab icon="alarm">Alarms</q-tab>
          <q-tab icon="movie">Movies</q-tab>
        </q-tabs>
        <q-tabs class="secondary">
          <q-tab icon="mail">Mails</q-tab>
          <q-tab icon="alarm">Alarms</q-tab>
          <q-tab icon="movie">Movies</q-tab>
        </q-tabs>
      </div>

      <p class="caption">
        And also "inverted".
      </p>
      <div class="group">
        <q-tabs class="orange inverted">
          <q-tab icon="mail">Mails</q-tab>
          <q-tab icon="alarm">Alarms</q-tab>
          <q-tab icon="movie">Movies</q-tab>
        </q-tabs>
        <q-tabs class="secondary inverted">
          <q-tab icon="mail">Mails</q-tab>
          <q-tab icon="alarm">Alarms</q-tab>
          <q-tab icon="movie">Movies</q-tab>
        </q-tabs>
        <q-tabs class="dark inverted">
          <q-tab icon="mail">Mails</q-tab>
          <q-tab icon="alarm">Alarms</q-tab>
          <q-tab icon="movie">Movies</q-tab>
        </q-tabs>
      </div>

      <p class="caption">
        <span class="desktop-only">Click</span>
        <span class="mobile-only">Tap</span>
        on next Tabs to see target below them swapping views.
      </p>

      <div class="shadow-1">
        <q-tabs
          :refs="$refs"
          default-tab="tab-4"
          class="primary shadow-1"
          style="padding-top: 5px"
        >
          <q-tab name="tab-1" icon="message">Tab 1</q-tab>
          <q-tab name="tab-2" disable icon="fingerprint">Tab 2</q-tab>
          <q-tab name="tab-3" icon="alarm">Tab 3</q-tab>
          <q-tab name="tab-4" icon="accessibility">Tab 4</q-tab>
          <q-tab name="tab-5" hidden icon="accessibility">Tab 5</q-tab>
        </q-tabs>

        <div style="padding: 15px;">
          <div ref="tab-1">
            <div v-for="n in 5">Tab 1</div>
          </div>
          <div ref="tab-2">
            <div v-for="n in 10">Tab 2</div>
          </div>
          <div ref="tab-3">
            <div v-for="n in 7">Tab 3</div>
          </div>
          <div ref="tab-4">
            <div v-for="n in 4">Tab 4</div>
          </div>
          <div ref="tab-5">
            <div v-for="n in 2">Tab 5</div>
          </div>
        </div>
      </div>

      <br><br>
      <div class="shadow-1">
        <q-tabs
          :refs="$refs"
          v-model="xTabsModel"
          class="orange shadow-1"
          style="padding-top: 5px"
        >
          <q-tab name="xtab-1" icon="message">Tab 1</q-tab>
          <q-tab name="xtab-2" icon="alarm">Tab 2</q-tab>
          <q-tab name="xtab-3" icon="accessibility">Tab 3</q-tab>
        </q-tabs>

        <div style="padding: 15px;">
          <div class="flex items-baseline">
            <div style="margin-right: 10px">Programmatic select tab:</div>
            <q-select type="radio" v-model="xTabsModel" :options="xTabsOptions"></q-select>
          </div>

          <div ref="xtab-1">
            <div v-for="n in 5">Tab 1</div>
          </div>
          <div ref="xtab-2">
            <div v-for="n in 7">Tab 2</div>
          </div>
          <div ref="xtab-3">
            <div v-for="n in 4">Tab 3</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      xTabsModel: 'xtab-2',
      xTabsOptions: [
        {label: 'Tab 1', value: 'xtab-1'},
        {label: 'Tab 2', value: 'xtab-2'},
        {label: 'Tab 3', value: 'xtab-3'}
      ]
    }
  }
}
</script>
