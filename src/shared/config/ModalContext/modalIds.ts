export const MODAL_IDS = {
    // Image Gallery modals
    IMAGE_PREVIEW: 'image-preview-modal',
    ADD_IMAGE: 'add-image-modal',
    EDIT_IMAGE: 'edit-image-modal',
    
    // Kanban Board modals
    ADD_COLUMN: 'add-column-modal',
    EDIT_TASK: 'edit-task-modal',
    ADD_TASK: 'add-task-modal',

    // Create Trip modal
    CREATE_TRIP: 'create-trip-modal',
    
    // Parties modal
    ADD_PARTIES: 'add-parties-modal',

    // BudgetTable modal
    ADD_BUDGET_TABLE: 'add-budget-table-modal',

    // ImagePicker modal
    IMAGE_PICKER: 'image-picker-modal',

    // Copy Trip modal
    COPY_TRIP: 'copy-trip-modal',
} as const;

// Type for modal IDs
export type ModalId = typeof MODAL_IDS[keyof typeof MODAL_IDS]; 