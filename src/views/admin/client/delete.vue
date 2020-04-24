<script>
import axios from '@/plugins/axios';
export default {
	
	async created(){
		this.clientId = this.$route.params.id;

		if(localStorage.user){
			this.user = JSON.parse(localStorage.user);
			await this.deleteClient();
		}
	},

	data(){
		return {
			user: undefined,
			clientId: undefined
		}
	},

	methods: {
		async deleteClient(){
			try{
				await axios({
					url: `/client/${this.clientId}`,
					method: 'DELETE',
					headers: {
            'Authorization': `Bearer ${this.user.jwt}`
					}
				});

				alert('Cliente deletado com sucesso')

        this.$router.push('/admin/client/list');
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