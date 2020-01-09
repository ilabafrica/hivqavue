import apiCall from '../../utils/api'

const state = {
	questions: []
};

const getters = {
	questions: (state) => state.questions,
};

const actions = {
	async fetchQuestions({commit, state}, page) {
		const response = await apiCall({url: `questions?type=app`, method: 'GET' });
		commit('setQuestions', response)
	},
};

const mutations = {
	setQuestions : (state, questions) => state.questions = questions,
};

export default {
	state,
	getters,
	actions,
	mutations
}