export interface Exercise {
	name: string
	workTime: number
	restTime: number
	rounds: number
}

export type Set = {
	exercises: Exercise[]
	totalRounds: number
	skipLastRest: boolean
}
