export type TimerFormValues = {
  workDuration: number,
  breakDuration: number,
  shouldRepeat: boolean,
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
  shouldRepeat: boolean,
  shouldUseAcceleratedTime: boolean,
}
