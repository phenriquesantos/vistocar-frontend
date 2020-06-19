<script>
import axios from '../../plugins/axios';

import adminPanel from '@/components/admin/panel.vue';

export default {
	components: {
		'admin-panel': adminPanel
	},

	async created(){
		if(localStorage.user){
			this.user = JSON.parse(localStorage.user);
			
			if(this.user.role == 'admin'){
				await this.getSchedulingByDate();
			}else{
				await this.getSchedulingList();
				await this.getReportByClient();
			}
		}
	},

	data(){
		return {
			user: undefined,
			schedulings: [],
			reports: []
		}
	},

	methods: {
		async getSchedulingByDate(){
			let today = new Date();
			const dd = String(today.getDate()).padStart(2, '0');
			const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
			const yyyy = today.getFullYear();

			today = dd + '-' + mm + '-' + yyyy;

			try{
				const { data } = await axios({
					method: 'GET',
					url: '/schedule',
					headers: {
            'Authorization': `Bearer ${this.user.jwt}`
          },
          params: {
            'date': today
          }
				});

				if(data){
					this.schedulings = data;
				}
			}catch(e){
				console.log(`${e.code} - ${e.message}`);
			}
		},

		async getSchedulingList(){
      try{
        let clientId = this.user.clientId;

        const { data } = await axios({
          url: '/schedule',
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${this.user.jwt}`
          },
          params: {
            'client_id': clientId
          }
        });

        if(data){
          this.schedulings = data.slice(0, 5);
        }
      }catch(e){
        console.log(`ERROR ${e.code} - ${e.message}`);
      }
    },

		async getReportByClient(){
			try{
        let clientId = this.user.clientId;

        const { data } = await axios({
          url: '/report',
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${this.user.jwt}`
          },
          params: {
            'client_id': clientId
          }
        });

        if(data){
          this.reports = data.slice(0, 5);
        }
      }catch(e){
        console.log(`ERROR ${e.code} - ${e.message}`);
      }
		}
	}
}
</script>

<template>
	<admin-panel>
		<div class="admin">
			<section class="admin__section" v-if="user.role == 'admin'">
				<h1 class="admin__section__title">Agendamentos do dia</h1>
				<table class="list__content__table" v-if="schedulings.length">
					<thead>
						<tr>
							<th>ID</th>
							<th>Nome do cliente</th>
							<th>ID do cliente</th>
							<th>Data</th>
							<th>Horário</th>
							<th>Options</th>
						</tr>
					</thead>
					<tbody>
						<tr v-for="(scheduling, i) in schedulings"  v-bind:key="i">
							<td>{{ scheduling.id }}</td>
							<td>{{ scheduling.client.first_name }}</td>
							<td>{{ scheduling.client_id }}</td>
							<td>{{ scheduling.date }}</td>
							<td>{{ scheduling.time }}</td>
							<td class="list__content__table__buttons">
								<router-link
									v-bind:to="`/admin/scheduling/edit/${scheduling.id}`"
									class="list__content__table__buttons__item list__content__table__buttons__item--primary"
								>
									Editar
								</router-link>
								<router-link
									v-bind:to="`/admin/scheduling/delete/${scheduling.id}`"
									class="list__content__table__buttons__item list__content__table__buttons__item--danger"
								>
									Excluir
								</router-link>
							</td>
						</tr>
					</tbody>
				</table>
				<p class="list__content__not-found" v-else>Nenhum registro encontrado</p>

				<div class="admin__section__content-button">
					<router-link to="/admin/scheduling/list">Ver todos</router-link>
				</div>
			</section>
			<div v-else>
				<section class="admin__section">
					<h1 class="admin__section__title">Utimos Agendamentos</h1>
					
					<table class="list__content__table" v-if="schedulings.length">
						<thead>
							<tr>
								<th>ID</th>
								<th>Nome do cliente</th>
								<th>ID do cliente</th>
								<th>Data</th>
								<th>Horário</th>
								<th>Options</th>
							</tr>
						</thead>
						<tbody>
							<tr v-for="(scheduling, i) in schedulings"  v-bind:key="i">
								<td>{{ scheduling.id }}</td>
								<td>{{ scheduling.client.first_name }}</td>
								<td>{{ scheduling.client_id }}</td>
								<td>{{ scheduling.date }}</td>
								<td>{{ scheduling.time }}</td>
								<td class="list__content__table__buttons">
									<router-link
										v-bind:to="`/admin/scheduling/edit/${scheduling.id}`"
										class="list__content__table__buttons__item list__content__table__buttons__item--primary"
									>
										Editar
									</router-link>
									<router-link
										v-bind:to="`/admin/scheduling/delete/${scheduling.id}`"
										class="list__content__table__buttons__item list__content__table__buttons__item--danger"
									>
										Excluir
									</router-link>
								</td>
							</tr>
						</tbody>
					</table>
					<p class="list__content__not-found" v-else>Nenhum registro encontrado</p>

					<div class="admin__section__content-button">
						<router-link to="/admin/scheduling/list">Ver todos</router-link>
					</div>
				</section>

				<section class="admin__section">
					<h1 class="admin__section__title">Utimos Laudos</h1>

					<table class="list__content__table" v-if="reports.length">
						<thead>
							<tr>
								<th>ID</th>
								<th>Nome do cliente</th>
								<th>ID do cliente</th>
								<th>Status</th>
								<th>Options</th>
							</tr>
						</thead>
						<tbody>
							<tr v-for="(report, i) in reports"  v-bind:key="i">
								<td>{{ report.id }}</td>
								<td>{{ report.client.first_name }}</td>
								<td>{{ report.client.id }}</td>
								<td>{{ report.status }}</td>
								<td class="list__content__table__buttons" v-if="user.role == 'admin'">
									<router-link v-bind:to="`/admin/report/edit/${report.id}`" class="list__content__table__buttons__item list__content__table__buttons__item--primary">Editar</router-link>
									<router-link v-bind:to="`/admin/report/delete/${report.id}`" class="list__content__table__buttons__item list__content__table__buttons__item--danger">Excluir</router-link>
								</td>
								<td v-else>
									<router-link v-bind:to="`/admin/report/view/${report.id}`" class="list__content__table__buttons__item list__content__table__buttons__item--primary">Vizualizar</router-link>
								</td>
							</tr>
						</tbody>
					</table>
					<p class="list__content__not-found" v-else>Nenhum registro encontrado</p>

					<div class="admin__section__content-button">
						<router-link to="/admin/report/list">Ver todos</router-link>
					</div>
				</section>
			</div>
		</div>
	</admin-panel>
</template>

<style lang="less" scoped>

.admin__section{
	padding: 30px 20px;
	background: white;
	margin-bottom: 20px;

	&__title{
		margin-bottom: 20px;
		font-size: 20px;
		text-transform: uppercase;
	}

	&__content-button{
		display: flex;
		justify-content: right;
		align-items: center;
		padding: 0 0;
		margin-top: 40px;

		a{
			text-transform: uppercase;
			text-decoration: none;
			display: inline-block;
			padding: 10px 20px;
			border: 2px solid #066395;
			color: #066395;
			font-weight: bold;
			border-radius: 3px;
			transition: all .2s;

			&:hover{
				background:#066395;
				color: white;
			}
		}
	}
}

.list{
  // background: white;
  &__content{
    background: white;
    padding: 20px;
    border-radius: 3px;

    &__table{
      width: 100%;
      thead{
        th{
          background: #ddd;
          padding: 10px 5px;
          border-bottom: 1px solid #666;
          text-transform: uppercase;
        }
      }

      tbody{
        td{
          padding: 10px 5px;
          text-align: center;
        }
      }

      &__buttons{
        display: flex;
        justify-content: center;

        &__item{
          display: block;
          margin-right: 10px;
          padding: 7px 5px;
          border-radius: 2px;
          text-decoration: none;
          text-transform: uppercase;
          font-size: 14px;

          &--primary{
            background:#066395;
            color: white;
          }

          &--danger{
            color: white;
            background: #d92626;
          }
        }
      }
    }

    &__not-found{
      text-transform: uppercase;
      text-align: center;
      font-weight: bold;
    }
  }
}
</style>