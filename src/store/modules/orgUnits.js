import apiCall from '../../utils/api'

const state = {
	orgUnits: [],
	orgUnitsPagination: {
		search: ' ',
		current_page: 1,
		per_page: 0,
	    total: 0,
	    visible: 10
	}
};

const getters = {
	allOrgUnits: (state) => state.orgUnits,
	orgUnitsPagination: (state) => state.orgUnitsPagination
};

const actions = {
	async fetchorgUnits({commit, state}, data) {
		const response = await apiCall({url: `org_units?page=${data.page}`, method: 'GET' });
		commit('setorgUnits', response)
	},
	async fetchorgUnit({commit}, id) {
		try {
			const response = await apiCall({url: `org_units/${id}`, method: 'GET' });
			commit('setorgUnit', response);

		} catch (error){
			console.log(error.response)
		}
	},
	async addorgUnit({commit}, neworgUnits) {
		try {
			const response = await apiCall({url: 'org_units', data: neworgUnits, method: 'POST' });
			commit('neworgUnit', response);
		} catch (error){
			console.log(error.response)
		}
	},
	async updateorgUnit({commit}, orgUnits) {
		try {
			const response = await apiCall({url: `org_units/${orgUnits.id}`, data: orgUnits, method: 'PUT' });
			commit('setorgUnit', response);
		} catch (error) {
			console.log(error.response)
		}
	},
	async deleteorgUnit({commit}, id) {
		try {
			await apiCall({url: `org_units/${id}`, method: 'DELETE' });
			commit('removeorgUnit', id);
		} catch (error){
			console.log(error.response)
		}
	}
};

const mutations = {
	setorgUnits: (state, orgUnits) => {
		state.orgUnits = orgUnits.data
		state.orgUnitsPagination.current_page = orgUnits.current_page
		state.orgUnitsPagination.total = orgUnits.total
		state.orgUnitsPagination.per_page = orgUnits.per_page
	},
	setorgUnit: (state, updorgUnits) => {
		const index = state.orgUnits.findIndex(orgUnits => orgUnits.id === updorgUnits.id);
		if(index !== -1){
			state.orgUnits.splice(index, 1, updorgUnits);
		}
	},
	neworgUnit: (state, orgUnits) => state.orgUnits.unshift(orgUnits),
	removeorgUnit: (state, id) =>  state.orgUnits = state.orgUnits.filter(orgUnits => orgUnits.id !== id),
};

export default {
	state,
	getters,
	actions,
	mutations
}