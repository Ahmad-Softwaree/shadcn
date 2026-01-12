import { create } from "zustand";

export type ModalTypes =
  | "add"
  | "update"
  | "delete"
  | "info"
  | "success"
  | "filter"
  | "restore"
  | "employee"
  | "user"
  | "account"
  | "team"
  | null;

interface ModalState {
  modal: ModalTypes;
  modalData: any;
  modalProps: any;
  isPending: boolean;
  id: string | number;
  name: string;
  actionBar: string;
  entityType: "employee" | "user" | "account" | "team" | null;
  openModal: (args: {
    type: ModalTypes;
    modalData?: any;
    id?: string | number;
    name?: string;
    modalProps?: any;
    entityType?: "employee" | "user" | "account" | "team";
  }) => void;
  setActionBar: (actionBar: string) => void;
  closeModal: () => void;
  submitForm: () => void;
  setModalData: (data: any) => void;
  clearModalData: () => void;
}

export const useModalStore = create<ModalState>((set, get) => ({
  modal: null,
  modalData: null,
  id: 0,
  name: "",
  isPending: false,
  modalProps: {},
  actionBar: "",
  entityType: null,

  setModalData: (modalData: any) => set({ modalData }),
  clearModalData: () => set({ modalData: null }),
  setActionBar: (actionBar: string) => set({ actionBar }),
  openModal: ({ type, modalData, id, name, modalProps, entityType }) =>
    set({
      modal: type,
      modalData,
      id,
      name,
      modalProps,
      isPending: false,
      entityType,
    }),

  closeModal: () =>
    set({
      modal: null,
      modalData: null,
      id: 0,
      name: "",
      isPending: false,
      modalProps: {},
      actionBar: "",
      entityType: null,
    }),

  submitForm: () => set({ isPending: true }),
}));
