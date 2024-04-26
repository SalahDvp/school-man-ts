"use client"
import React from 'react';
import { Separator } from '@/components/ui/separator';
import { DataTableDemo } from './components/levels-table';

const Level = () => {

  const selectedLanguage = {
    memberships_discounts: "Levels",
    add_edit_remove_memberships_and_discounts: "Add, edit, or remove levels",
    memebership_list: "Level List",
    add_membership: "Add Level",
    discounts_list: "",
    add_discounts: "",
    name: "Name",
    age_range: "Age Range",
    description: "Description",
    price: "Price",
    objects_of_study: "Objects of Study"
  };

  return (
    <div className="space-y-6">

    <DataTableDemo />
  </div>
  );
};

export default Level;