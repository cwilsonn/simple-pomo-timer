<template>
  <div class="container p-4 mx-auto">
    <PomoTimerClock v-if="state.timer"
      :countdown="state.countdown"
      :timer="state.timer"
      :isOnBreak="state.isOnBreak"
      :isPaused="state.isPaused"
      @timer:play="handlePlay"
      @timer:pause="handlePause"
      @timer:stop="handleStop" />
    <PomoTimerForm v-else
      @form:submit="handleFormSubmit" />
  </div>
</template>

<script setup
  lang="ts">
  import type { TimerFormValues, TimerState } from '~/types';

  const state = ref<TimerState>({
    countdown: '00:00',
    timer: null,
    isOnBreak: false,
    isBreakOver: false,
    isPaused: false,
    pausedTime: null,
    workDuration: 0,
    breakDuration: 0,
    shouldRepeat: false,
    shouldUseAcceleratedTime: false,
  });

  const computedInterval = computed(() => state.value.shouldUseAcceleratedTime ? 100 : 1000);

  const audio = ref<{
    instance: HTMLAudioElement | null;
    workUrl: string;
    breakUrl: string;
  }>({
    instance: null,
    workUrl: 'audio/33788__jobro__5-beep-b.wav',
    breakUrl: 'audio/263133__pan14__tone-beep.wav',
  });

  function maybeClearTimerInterval() {
    if (state.value.timer !== null) clearInterval(state.value.timer);
  }

  function resetTimer() {
    maybeClearTimerInterval();

    if (state.value.isOnBreak && state.value.isBreakOver) {
      state.value.countdown = `${String(state.value.workDuration).padStart(2, '0')}:00`;
      state.value.isOnBreak = false;
      state.value.isBreakOver = false;
    } else {
      state.value.countdown = `${String(state.value.breakDuration).padStart(2, '0')}:00`;
      state.value.isOnBreak = true;
      state.value.isBreakOver = true;
    }

    state.value.isPaused = false;
    state.value.pausedTime = null;
    handlePlay();
  }

  function handlePlay() {
    state.value.isPaused = false;
    let [minutes, seconds] = state.value.countdown.split(':').map(Number);

    if (!state.value.isOnBreak) {
      if (!audio.value.instance) return;
      audio.value.instance.src = audio.value.workUrl;
      audio.value.instance.play();
    } else {
      if (!audio.value.instance) return;
      audio.value.instance.src = audio.value.breakUrl;
      audio.value.instance.play();
    }

    state.value.timer = setInterval(() => {
      if (seconds > 0) {
        seconds--;
      } else if (minutes > 0) {
        minutes--;
        seconds = 59;
      }
      state.value.countdown = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
      if (minutes === 0 && seconds === 0) {
        maybeClearTimerInterval();
        if (state.value.shouldRepeat) {
          resetTimer();
        } else {
          handleStop();
        }
      }
    }, computedInterval.value);
  }

  function handlePause() {
    maybeClearTimerInterval();
    state.value.isPaused = true;
    state.value.pausedTime = state.value.countdown;
  }

  function handleStop() {
    maybeClearTimerInterval();
    state.value.timer = null;
    state.value.countdown = `0:00`;
    state.value.isOnBreak = false;
  }

  function handleFormSubmit(formValues: TimerFormValues) {
    Object.assign(state.value, formValues);
    state.value.isOnBreak = false;
    state.value.countdown = `${String(formValues.workDuration).padStart(2, '0')}:00`;
    handlePlay();
  }

  onMounted(() => audio.value.instance = new Audio());

  onBeforeUnmount(() => maybeClearTimerInterval());
</script>
