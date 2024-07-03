import { ref, unref } from 'vue';

export function useDescription (props) {
    const desc = ref(null);
    function register (instance) {
        desc.value = instance;
        props && instance.setDescProps(props);
    }
    const methods = {
        setDescProps: (descProps) => {
            unref(desc)?.setDescProps(descProps);
        },
    };
    return [register, methods];
}
