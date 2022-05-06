<template>    
    <div v-if="!missatgeEstat" class="form-group">
        holaaaaaaaaaaaaaaaa {{this.numPuntsSalt}}
        <div v-for="item in this.numPuntsSalt" :key="item">
            <input type="range" min="0" :max="items" step="1"> 
        </div>
    </div>
</template>
<script>

export default {
    name: 'InputRangeComponent',
    setup() {
        
    },
}
</script>
