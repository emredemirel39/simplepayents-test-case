<template>
    <div class="profile-page__wrapper">
        <h1 class="profile-page__title">Мой Профиль</h1>
        <form v-if="isLoggedIn" class="update-form" @submit.prevent="handleSubmit(form)" >

            <div class="update-form__input-wrapper">
                <div class="update-form__input-box">
                    <label>Ф.И.О.</label>
                    <input @input="clearErrMessage" v-model="form.name" type="text">
                </div>
                <p ref="nameErrRef" ></p>
            </div>
            <div class="update-form__input-wrapper">
                <div class="update-form__input-box">
                    <label>Почта</label>
                    <input @input="clearErrMessage" v-model="form.email" type="text">
                </div>
                <p ref="mailErrRef"></p>
            </div>
            <div class="update-form__input-wrapper">
                <div class="update-form__input-box">
                    <label>Телефон</label>
                    <input @input="clearErrMessage" v-model="form.phone" type="text">
                </div>
                <p ref="phoneErrRef"></p>
            </div>
            <button type="submit" >Сохранить</button>
            <div class="update-form__message">
                {{errMessage}}
            </div>
        </form>
        <h4 class="profile-page__protect-message" v-else >Вы должны создать аккаунт</h4>
    </div>
</template>
<script>
import { mapActions, mapWritableState } from 'pinia';
import { useUserStore } from '../stores/userStore';
import { nameRegex, emailRegex, phoneRegex } from '../utils';

export default {
    name: "UserProfile",

    data() {
        return {
        }
    },

    // mounted() {
    //     console.log(this.$pinia.state.value.userStore.user?.name)
    // },

    computed: {
        ...mapWritableState(useUserStore, ['userName', 'user', 'errMessage', 'isLoggedIn']),

        form() {
            return ({
                name: this.user?.name,
                email: this.user?.email,
                phone: this.user?.phone
            })
        }
    },

    methods: {
        ...mapActions(useUserStore, ['updateUser']),

        checkValidation() {

            let isValid = true

            if (this.form.name.match(nameRegex) === null) {

                this.$refs.nameErrRef.textContent = 'Должен быть на кириллице и от 3 до 30 символов';
                isValid = false
            }

            if (this.form.email.match(emailRegex) === null) {

                this.$refs.mailErrRef.textContent = 'Неправильный адрес электронной почты, пример: example@example.com';
                isValid = false
            }

            if (this.form.phone.match(phoneRegex) === null) {

                this.$refs.phoneErrRef.textContent = 'Неправильный телефонный номер, пример: +79999999999';
                isValid = false
            }

            return isValid;

        },

        handleSubmit(form) {
            const formIsValid = this.checkValidation();

            if (formIsValid) {
                this.updateUser(form)
            }
        },

        clearErrMessage() {
            this.errMessage = '';
            this.$refs.nameErrRef.textContent = '';
            this.$refs.mailErrRef.textContent = '';
            this.$refs.phoneErrRef.textContent = '';
        }, 

    }
}
</script>
<style lang="scss">

    .profile-page{

        &__wrapper {
        display: flex;
        flex-direction: column;
        align-items: center;
        }

        &__title {
            margin: 1rem 0;
        }
    }

    .update-form{
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 1.5rem;
        border: 1px solid rgba(47, 47, 47, 0.427);
        box-shadow: 0 1px 1.5px 0.5px rgba(47, 47, 47, 0.427);
        padding: 1.5rem 4.5rem;

        &__input-wrapper{
            width: 100%;


            p{
                width: 100%;
                max-width: fit-content;
                word-wrap: break-word;
                min-height: 40px;
                color: red;
                transition: all 2s ease;
            }
        }

        &__input-box{
            width: 100%;
            display: flex;
            justify-content: space-between;
            gap: 2rem;
        }

        &__message{
            color: red;
            min-height: 22px;
        }

        &__protect-message{
            margin: 1rem 0;
        }
    }
    
</style>