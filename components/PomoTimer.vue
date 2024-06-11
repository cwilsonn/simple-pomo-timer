<template>
  <div class="container p-2 mx-auto">
    <PomoTimerClock v-if="state.timer"
      :countdown="state.countdown"
      :timer="state.timer"
      :isOnBreak="state.isOnBreak"
      :isPaused="state.isPaused"
      :isMuted="!state.shouldPlaySound"
      @timer:play="handlePlay"
      @timer:pause="handlePause"
      @timer:stop="handleStop"
      @timer:mute-audio="state.shouldPlaySound = false"
      @timer:unmute-audio="state.shouldPlaySound = true" />
    <PomoTimerForm v-else
      @form:submit="handleFormSubmit" />
  </div>
</template>

<script setup
  lang="ts">
  import type { TimerFormValues, TimerState } from '~/types';

  const defaultTimerState = {
    countdown: '00:00',
    timer: null,
    isOnBreak: false,
    isBreakOver: false,
    isPaused: false,
    pausedTime: null,
    workDuration: 25,
    breakDuration: 5,
    shouldPlaySound: false,
    shouldRepeat: false,
    shouldUseAcceleratedTime: false,
    audio: {
      instance: null,
      workUrl: 'audio/33788__jobro__5-beep-b.wav',
      breakUrl: 'audio/263133__pan14__tone-beep.wav',
    },
  };

  const state = ref<TimerState>({ ...defaultTimerState });

  const computedInterval = computed(() => state.value.shouldUseAcceleratedTime ? 100 : 1000);

  function handlePlay() {
    if (state.value.isPaused) state.value.isPaused = false;

    if (state.value.shouldPlaySound && state.value.audio.instance) {
      state.value.audio.instance.src = state.value.isOnBreak
        ? state.value.audio.breakUrl
        : state.value.audio.workUrl;
      state.value.audio.instance.play();
    }

    state.value.timer = setInterval(handleCountdown, computedInterval.value);
  }

  function handlePause() {
    clearTimerInterval();
    state.value.isPaused = true;
    state.value.pausedTime = state.value.countdown;
  }

  function handleStop() {
    clearTimerInterval();
    Object.assign(state.value, { ...defaultTimerState });
  }

  function handleCountdown() {
    let [minutes, seconds] = state.value.countdown.split(':').map(Number);

    if (seconds > 0) {
      seconds--;
    } else if (minutes > 0) {
      minutes--;
      seconds = 59;
    }

    state.value.countdown = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    if (minutes === 0 && seconds === 0) state.value.shouldRepeat ? resetTimer() : handleStop();
  }

  function clearTimerInterval() {
    if (state.value.timer !== null) clearInterval(state.value.timer);
  }

  function resetTimer() {
    clearTimerInterval();
    const isReturningFromBreak = (state.value.isOnBreak && state.value.isBreakOver);
    Object.assign(state.value, {
      ...state.value,
      countdown: isReturningFromBreak
        ? `${String(state.value.workDuration).padStart(2, '0')}:00`
        : `${String(state.value.breakDuration).padStart(2, '0')}:00`,
      isOnBreak: !isReturningFromBreak,
      isBreakOver: !isReturningFromBreak,
      isPaused: false,
      pausedTime: null,
    });
    handlePlay();
  }

  function handleFormSubmit(formValues: TimerFormValues) {
    Object.assign(state.value, {
      ...state.value,
      countdown: `${String(formValues.workDuration).padStart(2, '0')}:00`,
      ...formValues,
    });
    handlePlay();
  }

  onMounted(() => state.value.audio.instance = new Audio());
  onBeforeUnmount(() => clearTimerInterval());
</script>
