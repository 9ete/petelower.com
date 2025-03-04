<template>
    <div>
        Email Me: <a :href="obfuscatedEmail">{{ obfuscatedEmailText }}</a>
    </div>
</template>

<script>
export default {
    data() {
        return {
            email: 'pete@petelower.com',
            obfuscatedEmail: '',
            obfuscatedEmailText: ''
        };
    },
    mounted() {
        this.obfuscateEmail();
    },
    methods: {
        obfuscateEmail() {
            const emailParts = this.email.split('@');
            this.obfuscatedEmail = `mailto:${emailParts[0]}@${emailParts[1]}`;
            this.obfuscatedEmailText = `${emailParts[0]} [at] ${emailParts[1]}`;
        }
    }
};
</script>

<style scoped>
a {
    text-decoration: none;
    color: inherit;
}
</style>