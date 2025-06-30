import { useState } from "react";

export function FileUpload({setFile , property}) {

    return (
        <div className='space-y-2 mt-4'>

            <div className="relative space-y-2">
                <label htmlFor="linkedInProfileLink" className="block text-sm font-medium text-slate-700">
                    Profile <span className="text-red-500">*</span>
                </label>

                <input
                    type="file"
                    onChange={(e) => setFile(e.target.files[0])}
                    className={`w-full cursor-pointer pl-3 pr-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring focus:ring-slate-500 focus:border-slate-500 bg-white text-stone-500 file:mr-3  file:py-2 file:px-3 file:rounded-md file:border-[1px] file:text-sm file:font-medium file:bg-slate-300 file:text-stone-700 hover:file:cursor-pointer hover:file:bg-purple-500 hover:file:text-white ${property}`}
                />

            </div>
        </div>
    );
}
