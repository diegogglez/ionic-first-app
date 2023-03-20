import { MovieService } from './../../services/movie.service';
import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.page.html',
  styleUrls: ['./movies.page.scss'],
})
export class MoviesPage implements OnInit {

  movies: any[] = [];
  currentPage = 1;

  constructor(private movieService: MovieService, private loadingCtrl: LoadingController) { }

  ngOnInit() {
    this.movieService.getTopRatedMovies().subscribe(res => {
      console.log(res);
    })
  }

  async loadMovies() {

    const loading = await this.loadingCtrl.create({
      message: 'loading..',
      spinner: 'bubbles'
    })

    this.movieService.getTopRatedMovies(this.currentPage).subscribe((res) => {
      loading.dismiss();
      this.movies = [...this.movies, ...res.results];
      console.log(res);
    })
  }

}
