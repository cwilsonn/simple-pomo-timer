export type TimerFormValues = {
  workDuration: number,
  breakDuration: number,
  shouldRepeat: boolean,
  shouldPlaySound: boolean,
  shouldUseAcceleratedTime: boolean,
}

export type TimerState = {
  workDuration: number,
  breakDuration: number,
  countdown: string,
  timer: ReturnType<typeof setInterval> | null,
  isOnBreak: boolean,
  isBreakOver: boolean,
  isPaused: boolean,
  pausedTime: string | null,
  shouldPlaySound: boolean,
  shouldRepeat: boolean,
  shouldUseAcceleratedTime: boolean,
  audio: TimerAudioState,
}

export type TimerAudioState = {
  instance: HTMLAudioElement | null,
  workUrl: string,
  breakUrl: string,
}
