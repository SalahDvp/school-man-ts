"use client"
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { SheetDemo } from "@/app/(home)/forms/level/sheet-form";

const Level = () => {
  // Initial level data
  const levelsData = [
    { name: "Kindergarten", ageRange: "3–5", description: "Preschool", price: "50", objects: ["math", "english"] },
    { name: "Grade or Year 1", ageRange: "6–7", description: "Primary", price: "70", objects: ["math", "science"] },
    // Add other initial levels
  ];

  const [levels, setLevels] = useState([...levelsData]);

  // Add new level data
  const handleAddLevel = (newLevel) => {
    setLevels((prevLevels) => [...prevLevels, newLevel]);
  };

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
    <div className="col-span-8 overflow-hidden rounded-xl sm:bg-gray-50 sm:px-8 sm:shadow">
      <div className="pt-4">
        <h1 className="py-2 text-2xl font-semibold">{selectedLanguage.memberships_discounts}</h1>
        <p className="text-slate-600">{selectedLanguage.add_edit_remove_memberships_and_discounts}</p>
      </div>
      <hr className="mt-4 mb-8" />
      <div className="flex justify-between">
        <p className="text-xl font-semibold mt-4">{selectedLanguage.memebership_list}</p>
        <div className="mt-4">
          <SheetDemo addLevel={handleAddLevel} />
        </div>
      </div>

      <table className="w-full divide-y divide-gray-200 mt-4">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{selectedLanguage.name}</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{selectedLanguage.age_range}</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{selectedLanguage.description}</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{selectedLanguage.price}</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{selectedLanguage.objects_of_study}</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {levels.map((level, index) => (
            <tr key={index}>
              <td className="px-6 py-4 whitespace-nowrap">{level.name}</td>
              <td className="px-6 py-4 whitespace-nowrap">{level.ageRange}</td>
              <td className="px-6 py-4 whitespace-nowrap">{level.description || "-"}</td>
              <td className="px-6 py-4 whitespace-nowrap">{level.price || "-"}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                {level.objects?.join(", ") || "-"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <hr className="mt-4 mb-8" />
    </div>
  );
};

export default Level;
