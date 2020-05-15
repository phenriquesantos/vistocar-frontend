<script>
import axios from '@/plugins/axios';
export default {

	async created(){
		this.userId = this.$route.params.id;

		if(localStorage.user){
			this.user = JSON.parse(localStorage.user);
			await this.deleteUser();
		}
	},

	data(){
		return {
			user: undefined,
			userId: undefined
		}
	},

	methods: {
		async deleteUser(){
			try{
				await axios({
					url: `/user/${this.userId}`,
					method: 'DELETE',
					headers: {
            'Authorization': `Bearer ${this.user.jwt}`
					}
				});

				alert('Usere deletado com sucesso')

        this.$router.push('/admin/user/list');
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
