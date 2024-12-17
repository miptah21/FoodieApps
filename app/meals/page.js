import classes from "./page.module.css";
import Link from "next/link";
import MealsGrid from "@/components/meals/meals-grid";
import { getMeals } from "@/lib/meals";
import { Suspense } from "react";

async function MealsLoading() {
  const meals = await getMeals();
  return <MealsGrid meals={meals}/>
}

export default  function MealsPage() {
  return (
    <>
      <header className={classes.header}>
        <h1>
          Delicious Meals created{" "}
          <span className={classes.highlight}>by a food-loving community</span>
        </h1>
        <p>
          Discover new dishes, and connect with other food lovers. Join our
          community and share your favorite recipes!
        </p>
        <p className={classes.cta}>
            <Link href="/meals/share">Share Your Favorite Recipe</Link>
        </p>
      </header>
      <main className={classes.main}>
        <Suspense fallback={<p className={classes.loading}>
            Fetching meals...
        </p>}>
          <MealsLoading />
        </Suspense>
      </main>
    </>
  );
}
