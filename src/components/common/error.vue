<script>
export default {
    props: {
        error: { type: String, required: true }
    }
}
</script>

<template>
    <div class="error">
        <p class="error__message">{{ error }}</p>
    </div>
</template>

<style lang="less" scoped>
.error{
    padding: 10px;
    border: 1px solid red;
    border-radius: 5px;
    background: #ff00005e;
    color: white;
    margin-bottom: 20px;

    &__message{
        text-align: center;
        text-transform: uppercase;
        font-size: 14px;
        font-weight: bold;
    }
}    
</style>