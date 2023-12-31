import { ReactNode } from "react";
export type CounterState = {
  pageNumber: number;
};
export type childrenProps = {
  children: any;
};
export interface User{
    id: string,
    name: string,
    username: string,
    email:string,
    address: {
        street: string,
        suite: string,
        city: string,
        zipcode: string,
        geo: {
            lat: string,
            lng: string
        }
    },
    phone: string,
    website: string
    company: {
        name: string,
        catchPhrase: string,
        bs: string
    }

}
export enum ActionTypes  {
    registerText = "REGISTER_TEXT",
    siginText = "SIGNIN_TEXT",
    reset = "RESET_STATE",
    login="LOG_OUT",
    logout="LOG_IN"
 }
 export interface AuthProps{
  userExist: boolean; 
 }
 export  interface initialStateType {
  username: string,
  email:string,
  password:string
}
export interface LabelProps {
  children:string
}
export interface Inputprops {
  onChange: (x:any)=> void;
  type:string;
  name: string;
  placeholder? :string;
  value?:string;
  required?:boolean;
  multiple?: boolean

}
export interface Posts{
  userId:string,
  id:string,
  title:string,
  body:string

}
export interface Photos {
  albumId:string,
  id:string,
  title:string,
  url:string,
  thumbnailUrl:string
}
export interface PostProps {
  body: string;
  id?: string | null
  title: string;
  userId?: string;
}
export interface ResponseProp {
  data: {
    status: boolean,
    data:{
      email:string;
      password: string;
      __v: number;
      _id:string;

    },
    message:string;
  }
}
export interface SinglePostProps {
  body :string,
  createdAt: string,
  title: string,
  updatedAt: string,
  userId: string,
  _v:number,
  _id:string
}
export interface ModalProps {
  children: ReactNode;
}
export interface TitleProps{
  children:string
}
export interface BtnProps {
  name?:string ;
  icon?: ReactNode;
  onClick?:(x:any)=>void;
  type?: "button" | "submit" | "reset";
  children?: string | ReactNode,
  disabled?: boolean;
  className?: string;
}
export interface MProps {
  openModal: boolean;
  handleModal : () => void;
  isUser?: boolean;
 
}
export interface SinglePostProps {
  body :string,
  createdAt: string,
  title: string,
  updatedAt: string,
  userId: string,
  _v:number,
  _id:string
}
export interface Comment {
  body: string
  createdAt:string
  email:string
  name:string
  postId:string
  updatedAt:string
  __v:number
  _id:string

}
