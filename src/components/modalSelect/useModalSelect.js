import { ref, unref } from 'vue'
export const useModalSelect = () => {
    const modalSelectInstance = ref()
    const register = instance => {
        modalSelectInstance.value = instance
    }

    const getInstance = () => {
        const instance = unref(modalSelectInstance)
        if (!instance) {
            console.warn('useModalSelect must be register on ModalSelect component!')
        }
        return instance
    }

    const methods = {
        showModal() {
            const instance = getInstance()
            instance.showModal()
        },
        closeModal() {
            const instance = getInstance()
            instance.closeModal()
        },
        getCheckedKeys() {
            const instance = getInstance()
            return instance.getCheckedKeys()
        },
        getCheckedDataList() {
            const instance = getInstance()
            return instance.getCheckedDataList()
        }
    }

    return [register, methods]
}
