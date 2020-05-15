<script>
import axios from '@/plugins/axios';
export default {

	async created(){
		this.schedulingId = this.$route.params.id;

		if(localStorage.user){
			this.user = JSON.parse(localStorage.user);
			await this.deleteScheduling();
		}
	},

	data(){
		return {
			scheduling: undefined,
			schedulingId: undefined
		}
	},

	methods: {
		async deleteScheduling(){
			try{
				await axios({
					url: `/schedule/${this.schedulingId}`,
					method: 'DELETE',
					headers: {
            'Authorization': `Bearer ${this.user.jwt}`
					}
				});

				alert('Schedulinge deletado com sucesso')

        this.$router.push('/admin/scheduling/list');
			}catch(e){
				console.log(`ERROR ${e.code} - ${e.message}`);
			}
		}
	}
}
</script>

<template>
	<div class="admin-delete"></div>
</template>
