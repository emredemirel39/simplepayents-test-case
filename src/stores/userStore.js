import { ref, computed } from 'vue'
import { defineStore } from 'pinia';
import { apiUrl } from '../utils';

export const useUserStore = defineStore('userStore', {

    //state
    state: () => ({
        isLoggedIn: false,
        user: null,
        errMessage: ''

    }),

    //actions
    actions: {

         checkLocalStorage() {
            const condition = localStorage.getItem('isLoggedIn');

            if (condition) {
                this.isLoggedIn = JSON.parse(condition)

            } else {
                this.isLoggedIn = false;
                localStorage.setItem('isLoggedIn', JSON.stringify(this.isLoggedIn));
            }
        },
         
        async getCurrentUser() {
            const url = apiUrl;
            const authKey = localStorage.getItem('auth_key');
            this.errMessage = '';

            if (authKey) {
                try {

                    const response = await fetch(url, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${authKey}`
                        }
                    });
                    const data = await response.json();

                    if (response.status === 200) {
                        this.user = data;
                        this.isLoggedIn = true
                    } else {
                        this.errMessage = data.message;
                        alert(data.message);
                    }

                } catch (error) {
                    this.errMessage = error.message;
                    console.log(error)
                }
            } else {
                this.isLoggedIn = false;
                localStorage.setItem('isLoggedIn', JSON.stringify(this.isLoggedIn))
            }
            
        },

         async updateUser(form) {
            const url = apiUrl;
             const authKey = localStorage.getItem('auth_key');
             this.errMessage = '';

            if (authKey) {
                try {

                    const response = await fetch(url, {
                        method: 'PATCH',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${authKey}`
                        },
                        body: JSON.stringify(form)
                    });

                    const xActionId = response.headers.get('X-Action-Id');
                    console.log('X-Action-Id', xActionId) // NULL !;

                    const data = await response.json();

                    if (response.status === 200) {
                        this.user = data
                        alert('Succesfully updated!');
                    } else {
                        this.errMessage = data.message;
                    }

                    // access-control-expose-headers ???

                    // for (const header of response.headers.entries()) {
                    //     console.log(header);
                    // } NULL

                    //console.log('Header', response.headers['x-action-id']); NULL

                    // response.headers.forEach((value, name) => {
                    //     console.log(name + ": " + value);
                    // }); NULL

                    // const xhr = new XMLHttpRequest();
                    // xhr.open("PATCH", "https://api.sitemap-generator.ru/test-api/user"); NULL

                    // xhr.setRequestHeader("Content-Type", "application/json");
                    // xhr.setRequestHeader('Authorization', `Bearer ${JSON.parse(authKey)}`);
                    // xhr.send(JSON.stringify(this.form))

                    //console.log(xhr.getAllResponseHeaders()) NULL
                    //const y = xhr.getResponseHeader('x-action-id')
                    //console.log(y); NULL
                    
                } catch (error) {
                    console.error(error);
                    this.errMessage = error.message;
                }
            }
        },
         
        async createNew(form) {

            const url = apiUrl;
            const xAppToken = localStorage.getItem('X-Application-Token');
            this.errMessage = '';

            try {

                const response = await fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-Application-Token': xAppToken
                    },
                    body: JSON.stringify(form)
                });

                const data = await response.json();

                if (response.status === 201) {
                    this.user = data;
                    localStorage.setItem('auth_key', data.auth_key);
                    this.isLoggedIn = true;
                    localStorage.setItem('isLoggedIn', JSON.stringify(this.isLoggedIn));
                    alert('Succesffully created new user');
                } else {
                    this.errMessage = data.message
                }
                
            } catch (error) {
                console.log(error.message)
                this.errMessage = error.message;
            }
             
        }

    },

    //getters
    getters: {

    }

})
