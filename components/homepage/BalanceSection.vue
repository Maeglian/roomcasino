<template>
  <div class="GamePanel">
		<div class="GamePanel-Account">
			<p
				v-if="this.isLoggedIn"
				class="GamePanel-UserFullname"
			>
				{{ getFullUserName }}
			</p>

			<AttachedPopup
				v-if="this.isLoggedIn"
				v-model="isOpenPopup"
				@closePopup="closePopup"
			>
				<div
					slot="trigger"
					class="GamePanel-Balance"
					@click="togglePopup"
				>
					<span class="GamePanel-Balance--Value">{{ balance ? balance : activeAccount.balance }}</span>
					<span class="GamePanel-Balance--Currency">{{ currency ? currency : activeAccount.currency }}</span>
					<i
						class="GamePanel-Balance--Arrow Nav-Arrow ThinArrow"
						:class="{ 'Nav-Arrow--Active': isOpenPopup }"
					/>
				</div>

				<ul class="GamePanel-Popup">
					<li
						v-for="({ balance, currency }, idx) in user.accountList"
						:key="idx"
						class="GamePanel-PopupItem"
						@click="selectCurrencyAccount({ balance, currency })"
					>
						{{balance}}
						{{currency}}
					</li>
				</ul>
			</AttachedPopup>

			<button
				v-if="this.isLoggedIn"
				class="Btn AuthSection-Btn AuthSection-Btn--deposit"
				@click="$modal.show('cashier')"
			>
        Deposit
      </button>

			<div
				v-else
				class="AuthSection-Login"
			>
				<button
					class="Btn AuthSection-Btn AuthSection-Btn--login"
					@click="showRegistrationDialog('login')"
				>
					Login
				</button>
				<button class="Btn AuthSection-Btn" @click="showRegistrationDialog('registration')">
					Register
				</button>
			</div>
		</div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import showAuthDialog from '@/mixins/showAuthDialog';

export default {
  mixins: [showAuthDialog],
	data: () => ({
		balance: null,
		currency: null,
		isOpenPopup: false,
	}),
	methods: {
		togglePopup() {
			this.isOpenPopup = !this.isOpenPopup;
		},
		closePopup() {
			this.isOpenPopup = false;
		},
		selectCurrencyAccount({ balance, currency }) {
			this.balance = balance;
			this.currency = currency;
			this.closePopup();
		},
	},
	computed: {
		...mapState(['user']),
		...mapGetters(['activeAccount']),
		getFullUserName() {
			const { firstName, lastName } = this.user;
			return `${firstName} ${lastName}`;
		},
	},
};
</script>

<style lang="scss">
	.GamePanel {
		display: flex;
		justify-content: space-between;
		align-items: center;
		text-transform: uppercase;
		font-weight: bold;
		height: 100%;

		&-Popup {
			color: #fff;
			background: #10133a;
			border-radius: 8px;
			overflow: hidden;
		}

		&-PopupItem {
			padding: 16px 13px;
			transition: .2s all;
			cursor: pointer;

			&:hover {
				background: #242857;
			}

			&:not(:last-child) {
				border-bottom: 1px solid #1d2047;
			}
		}

		&-Account {
			display: flex;
			align-items: center;
			height: 100%;
		}

		&-UserFullname {
			margin: 0 20px 0 0;
			font-size: 10px;
			color: #fff;

			@media (max-width: $screen-xs) {
				font-size: 8px;
			}

			@media (max-width: $screen-xs) {
				display: none;
			}
		}

		&-Balance {
			display: flex;
			align-items: center;
			cursor: pointer;
			margin-right: 36px;
			font-size: 10px;

			&--Value {
				margin: 0;
				color: #fff;
			}

			&--Currency {
				margin: 0;
				color: #ccc;
				margin-left: 3px;
			}

			&--Arrow {
				transform: rotate(45deg) translateY(-40%);
			}
		}
	}

	.Nav-Arrow{
		transition: .2s all;

		&--Active {
			transform: rotate(225deg);
		}
	}
</style>
