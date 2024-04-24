<dialog bind:this={dialogRef} {...$$restProps}>
    <slot open={openDialog} close={closeDialog} {setModal}></slot>
</dialog>
<script lang="ts">
    export let open = false;
    export let modal = true;

    export { className as class };

    let dialogRef: HTMLDialogElement;

    $: {
        if (dialogRef) {
            if (open) {
                if (modal) dialogRef.showModal();
                else dialogRef.show();
            } else {
                dialogRef.close();
            }
        }
    }

    function closeDialog() {
        open = false;
    }

    function openDialog() {
        open = true;
    }

    function setModal(value: boolean) {
        modal = value;
    }
</script>

<style lang="postcss">
    dialog::backdrop {
        background-color: rgba(0, 0, 0, 0.5);
    }

    dialog {
        background-color: transparent;
    }
</style>
