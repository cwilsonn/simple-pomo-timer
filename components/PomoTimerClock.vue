<template>
  <section class="grid max-w-screen-md gap-4 place-items-center">
    <div class="w-full p-16 font-bold text-center rounded-lg border-[6px] font-dseg text-7xl md:text-9xl"
      :class="{
        'text-success border-success bg-success bg-opacity-25': !isOnBreak,
        'text-warning border-warning bg-warning bg-opacity-25': isOnBreak
      }">{{ countdown }}</div>
    <div v-if="timer"
      class="flex flex-col w-full gap-4 sm:flex-row justify-stretch">
      <button class="flex-grow font-mono font-bold border-4 btn md:btn-lg btn-outline basis-0"
        type="button"
        :title="isPaused ? 'Start' : 'Pause' + ' timer'"
        @click="isPaused ? emit('timer:play') : emit('timer:pause')">
        <Icon :name="isPaused ? 'uil:play' : 'uil:pause'"
          size="2rem" />
        <span>
          {{ isPaused ? 'PLAY' : 'PAUSE' }}
        </span>
      </button>
      <button class="flex-grow font-mono font-bold border-4 btn md:btn-lg btn-outline basis-0"
        type="button"
        title="Stop timer"
        @click="emit('timer:stop')">
        <Icon name="uil:stopwatch-slash"
          size="2rem" />
        <span>STOP</span>
      </button>
      <button class="flex-grow font-mono font-bold border-4 btn md:btn-lg btn-outline basis-0"
        type="button"
        :title="(isMuted ? 'Unmute' : 'Mute') + ' sounds'"
        @click="isMuted ? emit('timer:unmute-audio') : emit('timer:mute-audio')">
        <Icon :name="isMuted ? 'uil:volume-mute' : 'uil:volume'"
          size="2rem" />
        <span>{{ isMuted ? 'UNMUTE' : 'MUTE' }}</span>
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
