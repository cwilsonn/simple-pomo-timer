<template>
  <section class="grid gap-4 place-items-center">
    <div class="font-mono font-bold text-center text-9xl"
      :class="{
        'text-success': !isOnBreak,
        'text-error': isOnBreak
      }">{{ countdown }}</div>
    <div v-if="timer"
      class="flex flex-row gap-2">
      <button class="border-4 btn btn-lg btn-circle btn-outline"
        type="button"
        :class="{
          'btn-error': !isPaused,
          'btn-success': isPaused,
        }"
        :title="isPaused ? 'Start' : 'Pause' + ' timer'"
        @click="isPaused ? emit('timer:play') : emit('timer:pause')">
        <Icon :name="isPaused ? 'uil:play' : 'uil:pause'"
          size="3rem" />
        <span class="sr-only">
          {{ isPaused ? 'Start' : 'Pause' }} timer
        </span>
      </button>
      <button class="border-4 btn btn-lg btn-circle btn-outline btn-error"
        type="button"
        title="Stop timer"
        @click="emit('timer:stop')">
        <Icon name="uil:stopwatch-slash"
          size="3rem" />
        <span class="sr-only">Stop timer</span>
      </button>
      <button class="border-4 btn btn-lg btn-circle btn-outline btn-error"
        type="button"
        :title="(isMuted ? 'Unmute' : 'Mute') + ' sounds'"
        @click="isMuted ? emit('timer:unmute-audio') : emit('timer:mute-audio')">
        <Icon :name="isMuted ? 'uil:volume' : 'uil:volume-mute'"
          size="3rem" />
        <span class="sr-only">{{ isMuted ? 'Unmute' : 'Mute' }} sounds</span>
      </button>
    </div>
  </section>
</template>

<script setup
  lang="ts">
  type PomoTimerTimerProps = {
    countdown: string,
    timer: NodeJS.Timeout,
    isOnBreak: boolean,
    isPaused: boolean,
    isMuted: boolean,
  };

  const props = defineProps<PomoTimerTimerProps>();
  const emit = defineEmits([
    'timer:play',
    'timer:pause',
    'timer:stop',
    'timer:unmute-audio',
    'timer:mute-audio',
  ]);
</script>
