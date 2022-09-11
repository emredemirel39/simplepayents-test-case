<template>
    <div class="wrapper">
        <h1 class="title">Создать Аккаунт</h1>
        <h4 class="protect-message" v-if="isLoggedIn" >У вас уже есть аккаунт!!!</h4>
        <form v-else @submit.prevent="handleSubmit(form)" class="create-form">
            <div class="create-form__input-wrapper">
                <div class="create-form__input-box">
                    <label>Ф.И.О.</label>
                    <input @input="clearErrMessage"  v-model="form.name" type="text">
                </div>
                <p ref="nameErrRef" >Должен быть на кириллице и от 3 до 30 символов</p>
            </div>
            <div class="create-form__input-wrapper">
                <div class="create-form__input-box">
                    <label>Почта</label>
                    <input v-model="form.email" type="text">
                </div>
                <p ref="mailErrRef">Неправильный адрес электронной почты, пример: example@example.com</p>
            </div>
            <button>Создать</button>
            <div class="create-form__message">
                {{errMessage}}
            </div>
        </form>
    </div>
</template>


<script>

import { useUserStore } from '../stores/userStore';
import { mapActions, mapState, mapWritableState } from 'pinia';
import { nameRegex, emailRegex } from '../utils';

export default {
    name: "CreateNewUser",

    data() {
        return {
        }
    },

    computed: {
        ...mapWritableState(useUserStore, ['userName', 'isLoggedIn', 'user', 'errMessage']),

        form() {
            return ({
                name: '',
                email: ''
            })
        }
    },


    methods: {
        ...mapActions(useUserStore, ['createNew']),
 
        checkValidation() {

            let isValid = false

            if (this.form.name.match(nameRegex) === null) {

                this.$refs.nameErrRef.style.opacity = 1;
                isValid = false
            } else {
                isValid = true
            }

            if (this.form.email.match(emailRegex) === null) {

                this.$refs.mailErrRef.style.opacity = 1;
                isValid = false
            } else {
                isValid = true
            }

            return isValid;
        },

        handleSubmit(form) {
            const formIsValid = this.checkValidation();

            if (formIsValid) {
                this.createNew(form);
            }
        },

        clearErrMessage() {
            this.errMessage = '';
            this.$refs.nameErrRef.style.opacity = 0;
            this.$refs.mailErrRef.style.opacity = 0;
        }, 
        

    }
}
</script>


<style lang="scss">

    .wrapper{
        display: flex;
        width: 100%;
        flex-direction: column;
        align-items: center;
    }

    .title, .protect-message{
        margin: 1rem 0;
    }

    .create-form{
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
                transition: all 1s ease;
                opacity: 0;
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
    }
    
</style>