import apiCall from '../../utils/api'

const state = {
	answers: []
};

const getters = {
	answersCache: (state) => state.answers,
};

const actions = {
	async pushAnswers({commit}, data) {
		commit('setAnswers', data)
	}
};

const mutations = {
	setAnswers: (state, data) => state.answers = data
};

export default {
	state,
	getters,
	actions,
	mutations
}