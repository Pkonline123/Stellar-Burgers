import React from 'react';
import styles from './pages.module.css';
import { Route, Routes } from 'react-router-dom';
import ProfileMenu from '../components/profile-menu/profile-menu';
import UpdateProfileForm from '../components/update-profile-info/update-profile-info';
import ProfileOrders from "../components/profile-orders/profile-orders";

export default function Profile() {
  return (
    
    <section className={styles.profile}>
      <ProfileMenu />
      <>
        <Routes>
          <Route path="/" element={<UpdateProfileForm />} />
          <Route path="/orders" element={<ProfileOrders />} />
        </Routes>
      </>

    </section>
  )
}